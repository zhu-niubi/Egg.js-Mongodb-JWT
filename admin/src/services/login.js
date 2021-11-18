import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/admin/login', {
    method: 'POST',
    data: params,
  });
}

