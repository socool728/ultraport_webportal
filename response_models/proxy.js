import generateToken from '../utils/generateToken.js';

export const proxySuccessResponse = (proxy) => {
  return {
    id: proxy._id,
    proxy_name: proxy.proxy_name,
    email: proxy.email,
    ip: proxy.ip,
    bandwidth: proxy.bandwidth,
    port: proxy.port,
    time: proxy.time,
    file_url: proxy.file_url,
    user_id: proxy.user_id,
    createdAt: proxy.createdAt,
    updatedAt: proxy.updatedAt,
  };
};