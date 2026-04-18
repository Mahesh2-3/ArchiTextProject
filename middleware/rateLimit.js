import rateLimit from "express-rate-limit";

// General API rate limiter (uses default IPv6-aware IP extraction)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for auth routes (uses default IPv6-aware IP extraction)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter for AI chat endpoint
export const aiChatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each user to 10 AI requests per minute
  message: {
    success: false,
    message:
      "AI request limit exceeded, please wait before making another request.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID for rate limiting if authenticated, otherwise use IP (default handler)
    if (req.user && req.user._id) {
      return String(req.user._id);
    }
    // Return undefined to let express-rate-limit use its default IPv6-aware IP extraction
    return undefined;
  },
});
