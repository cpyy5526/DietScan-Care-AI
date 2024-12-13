'use client';

import { useEffect, useState } from 'react';
import { Table } from 'antd';

interface RangeDataItem {
  key: number;
  inference_time: string;
  inference_result: string;
}

interface RangeData {
  data: RangeDataItem[]; // data는 RangeDataItem 타입의 배열
  loading: boolean;
}

export default function RangeDataTable({ data, loading }: RangeData) {
  const columns = [
    {
      title: '바이오 파울링 예측 시각',
      dataIndex: 'inference_time',
      key: 'inference_time',
    },
    {
      title: '예측 결과',
      dataIndex: 'inference_result',
      key: 'inference_result',
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} pagination={false} style={{ width: '100%' }} />;
}
