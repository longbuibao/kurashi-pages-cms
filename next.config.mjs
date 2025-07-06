import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {};

export default withBundleAnalyzer(nextConfig);