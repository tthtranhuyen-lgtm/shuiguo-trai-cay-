/**
 * Speech synthesis & Audio utility for Chinese language learning
 * Optimized for natural pacing, voice selection, and zero-latency audio feedback.
 */

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
        this.synth = window.speechSynthesis;
        this.initVoices();
        if (this.synth && 'onvoiceschanged' in this.synth) {
          this.synth.onvoiceschanged = () => this.initVoices();
        }
      }
    } catch (e) {
      console.warn('SpeechSynthesis unavailable:', e);
    }
  }

  private initVoices() {
    try {
      if (!this.synth) return;
      this.voices = this.synth.getVoices() || [];
      // Prioritize natural neural / high-quality Chinese voices
      const chineseVoices = this.voices.filter(v => 
        v && typeof v.lang === 'string' && (v.lang.startsWith('zh') || v.lang.includes('cmn') || v.lang.includes('mandarin'))
      );
      
      // Preference order: Google 普通话, Microsoft Xiaoxiao/Yunxi, Ting-Ting, Sin-ji, or any zh-CN
      const preferredVoice = chineseVoices.find(v => 
        v && typeof v.name === 'string' && (
          v.name.includes('Google') || 
          v.name.includes('Xiaoxiao') || 
          v.name.includes('Yunxi') ||
          v.name.includes('Ting-Ting') ||
          v.name.includes('Natural')
        )
      ) || chineseVoices.find(v => v && v.lang === 'zh-CN') || chineseVoices[0];

      if (preferredVoice) {
        this.selectedVoice = preferredVoice;
      }
    } catch (e) {
      console.warn('initVoices error:', e);
    }
  }

  public getAvailableChineseVoices(): SpeechSynthesisVoice[] {
    try {
      if (!this.synth) return [];
      return (this.synth.getVoices() || []).filter(v => 
        v && typeof v.lang === 'string' && (v.lang.startsWith('zh') || v.lang.includes('cmn'))
      );
    } catch {
      return [];
    }
  }

  public setVoice(voiceName: string) {
    try {
      const v = this.voices.find(item => item && item.name === voiceName);
      if (v) this.selectedVoice = v;
    } catch {}
  }

  public getSelectedVoiceName(): string {
    return this.selectedVoice && this.selectedVoice.name ? this.selectedVoice.name : 'Mặc định (zh-CN)';
  }

  public speak(text: string, rate: number = 0.82, onEnd?: () => void) {
    if (!this.synth) return;
    // Cancel any active utterance to prevent queue lockup
    this.synth.cancel();

    // Clean text: strip markdown or extra characters
    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-CN';
    utterance.rate = Math.max(0.5, Math.min(1.5, rate));
    utterance.pitch = 1.0;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Pure Web Audio API synthesized audio effects for instant latency-free feedback
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public playSound(type: 'correct' | 'wrong' | 'flip' | 'coin' | 'click') {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'correct') {
      // Pleasant rising major chord chime (E5 -> G#5 -> B5)
      const freqs = [659.25, 830.61, 987.77];
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);
        gain.gain.setValueAtTime(0, now + index * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + index * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.35);
      });
    } else if (type === 'wrong') {
      // Soft gentle low buzz (F#3 -> D#3)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(170, now + 0.22);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'coin') {
      // Cash register bell ding for shopping cart
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'flip') {
      // Gentle card flip whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else {
      // Subtle tactile click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  }
}

export const speechEngine = new SpeechEngine();
