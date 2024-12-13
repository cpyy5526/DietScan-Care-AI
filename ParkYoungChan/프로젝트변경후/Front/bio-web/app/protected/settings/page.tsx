'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBackgroundContext } from '@/app/protected/test/context';
import { Divider, Radio, Table } from 'antd';
import '@/styles/setting.css';

// 데이터 타입 정의
interface DataType {
  key: string;
  number: string;
  user_id: string;
  name: string;
  date: string; // yyyy-mm-dd 형식으로 변환된 날짜
}

// Table 컴포넌트에 사용할 Props 타입
interface RowSelectionProps {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => void;
  getCheckboxProps: (record: DataType) => { disabled: boolean; name: string };
}

export default function Setting() {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // 페이지 로드 시 자동 새로고침
  }, [router]);

  const [data, setData] = useState<DataType[]>([]); // 데이터 상태 추가
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  // 페이지 이동 함수
  const goToOriginalPage = () => {
    router.back();
  };

  // 컨텍스트에서 데이터 가져오기
  const { isBackgroundActive, setIsBackgroundActive } = useBackgroundContext() as {
    isBackgroundActive: boolean;
    setIsBackgroundActive: (active: boolean) => void;
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBackgroundActive(e.target.checked);
  };

  // 배경 이미지 업데이트
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (isBackgroundActive) {
        body.style.backgroundImage = "url('/wave-background.png')";
      } else {
        body.style.backgroundImage = 'none';
        body.style.background = '#F8F8FA';
      }
    }
  }, [isBackgroundActive]);

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch('/api/api_protect/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), // 삭제할 ID 전달
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setData((prevData) => prevData.filter((user) => user.user_id !== id)); // 상태 업데이트
      } else {
        console.error('Failed to delete user:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Unix timestamp를 yyyy-mm-dd로 변환하는 함수
  const formatUnixToDate = (unixTime: number) => {
    const date = new Date(unixTime); // Unix timestamp는 초 단위이므로 1000을 곱함
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // SQLite 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/api_protect/users'); // API 호출
        const result = await response.json();

        // 날짜 변환 후 상태 업데이트
        const formattedData = result.map((item: any) => ({
          ...item,
          regi_date: formatUnixToDate(item.regi_date), // Unix time을 변환
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 로딩 상태 변경
      }
    };

    fetchData();
  }, []);

  // Table의 컬럼 정의
  const columns = [
    {
      title: '사용자 ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '등록일',
      dataIndex: 'regi_date', // 변환된 날짜 표시
    },
    {
      title: '사용자 삭제',
      render: (_, record) => (
        <button onClick={() => deleteUser(record.id)} style={{ color: 'red' }}>
          삭제
        </button>
      ),
    },
  ];

  const rowSelection: RowSelectionProps = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="footer1">
        <div>
          <img className="setting1" src="setting.png" alt="설정 아이콘" />
        </div>
        <div>
          <span className="admin">사용자 관리</span>
        </div>
        <div className="btnback">
          <button type="button" className="btn btn-outline-primary" onClick={goToOriginalPage}>
            원래 홈페이지로 돌아가기
          </button>
        </div>
      </div>

      <div>
        <Divider />
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          loading={loading} // 로딩 상태 추가
        />
      </div>

      <div className="footer1">
        <div>
          <img className="setting1" src="setting.png" alt="설정 아이콘" />
        </div>
        <div>
          <span className="admin">시스템 설정</span>
        </div>
      </div>

      <hr />

      <div className="checkbox_group">
        <label>
          <input type="checkbox" className="check" checked={isBackgroundActive} onChange={handleCheckboxChange} />
          <span className="txt">배경 추가하기</span>
        </label>
      </div>
    </div>
  );
}
