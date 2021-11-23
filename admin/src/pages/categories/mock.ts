import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
  'list|55': [
    {
      '_id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'articleNum|1-4': /[1-9]/,
      createTime: Random.datetime(),
      updateTime: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/categories'), (params) => {
      console.log(params);
      switch (params.type) {
        case 'POST':
          const { name } = JSON.parse(params.body);
          const returnData = Mock.mock({
            '_id|8': /[A-Z][a-z][-][0-9]/,
            name,
            articleNum: 0,
            createTime: Random.datetime(),
            updateTime: Random.datetime(),
          })

          data.list.unshift(returnData);
          return {
            "msg": "分类添加成功",
            "code": 0,
            data: returnData
          }
        case 'GET':
        default:
          const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
          const p = page as number;
          const ps = pageSize as number;

          return {
            list: data.list.slice((p - 1) * ps, p * ps),
            totalCount: 55,
          };
      }



    });
  },
});
