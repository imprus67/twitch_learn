import type { Request } from "express";
import type { SessionMetadata } from "../types/session-metadata.types";
import { IS_DEV_ENV } from "./is-dev.util";
import DeviceDetector = require("device-detector-js");
import { lookup } from "geoip-lite";

export function getSessionMetadata(req: Request, userAgent: string): SessionMetadata {

  const ip = IS_DEV_ENV ? '172.0.0.2' : Array.isArray(req.headers['cf-connecting-ip'])
    ? req.headers['cf-connecting-ip'][0] : req.headers['cf-connecting-ip']
    || (typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0] : req.ip)

  const device = new DeviceDetector().parse(userAgent)
  const location = lookup(ip)

  return {
    location: {
      country: location.country || 'unknown',
      city: location.city || 'unknown',
      latitude: location.ll[0] || 0,
      longitude: location.ll[1] || 0,
    },
    device: {
      browser: device.client.name,
      os: device.os.name,
      type: device.device.type
    },
    ip
  }
}
