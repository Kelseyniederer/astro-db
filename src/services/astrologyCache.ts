interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheKey {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
}

class AstrologyCache {
  private static instance: AstrologyCache;
  private cache: Map<string, CacheEntry<any>>;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): AstrologyCache {
    if (!AstrologyCache.instance) {
      AstrologyCache.instance = new AstrologyCache();
    }
    return AstrologyCache.instance;
  }

  private generateKey(key: CacheKey, type: string): string {
    return `${type}-${key.year}-${key.month}-${key.date}-${key.hours}-${key.minutes}-${key.seconds}-${key.latitude}-${key.longitude}-${key.timezone}`;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_DURATION;
  }

  public get<T>(key: CacheKey, type: string): T | null {
    const cacheKey = this.generateKey(key, type);
    const entry = this.cache.get(cacheKey);

    if (!entry || this.isExpired(entry.timestamp)) {
      return null;
    }

    return entry.data as T;
  }

  public set<T>(key: CacheKey, type: string, data: T): void {
    const cacheKey = this.generateKey(key, type);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}

export default AstrologyCache.getInstance();
