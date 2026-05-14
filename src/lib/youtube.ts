/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GetThumbnail - YouTube Utility Logic
 */

// هذه المعادلة تدعم: 
// 1. روابط Shorts (youtube.com/shorts/...)
// 2. الروابط العادية (youtube.com/watch?v=...)
// 3. روابط الموبايل المختصرة (youtu.be/...)
// 4. روابط البث المباشر (youtube.com/live/...)
// 5. الروابط المدمجة (youtube.com/embed/...)
export const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

/**
 * وظيفة استخراج الـ ID الخاص بالفيديو من الرابط
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  // تنظيف الرابط من أي مسافات زائدة
  const cleanUrl = url.trim();
  
  const match = cleanUrl.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

/**
 * مستويات جودة الصورة المصغرة بترتيب الأفضلية
 */
export enum ThumbnailQuality {
  MAXRES = 'maxresdefault', // 1280x720
  SD = 'sddefault',         // 640x480
  HQ = 'hqdefault',         // 480x360
  MQ = 'mqdefault',         // 320x180
  DEFAULT = 'default',      // 120x90
}

/**
 * مصفوفة لترتيب الجودة (تستخدم في مكونات العرض)
 */
export const QUALITY_ORDER = [
  ThumbnailQuality.MAXRES,
  ThumbnailQuality.SD,
  ThumbnailQuality.HQ,
  ThumbnailQuality.MQ,
  ThumbnailQuality.DEFAULT,
];

/**
 * وظيفة توليد رابط الصورة المباشر من خوادم جوجل
 */
export function getThumbnailUrl(videoId: string, quality: ThumbnailQuality = ThumbnailQuality.MAXRES): string {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}