'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import GraphOxygen from '@/components/GraphOxygen';
import GraphCondoc from '@/components/GraphConduc';
import GraphSalinity from '@/components/GraphSalinity';
import GraphTemperature from '@/components/GraphTemperature';
import Latest from '@/components/latest';
import RangeData from '@/components/range';
import Max from '@/components/max';
import Min from '@/components/min';
import Mean from '@/components/mean';
import Variance from '@/components/variance';
import LogoutButton from '@/components/LogoutButton';
import { useBackgroundContext } from '@/app/protected/test/context';
import Dayselect from '@/components/Dayselect';

import '@/styles/dashboardstyle.css';
import { log } from 'console';

interface HomeProps {
  deviceId: string;
  nextPage: string;
  prevPage: string;
}

async function fetchRangeData(sensor_id: string, start_time: string, end_time: string) {
  const response = await fetch(`/api/api_protect/range?sensor_id=${sensor_id}&start_time=${start_time}&end_time=${end_time}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default function Home({ deviceId, nextPage, prevPage }: HomeProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [day, setDay] = useState(Date.now() - 24 * 60 * 60 * 1000);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const startDate = new Date(day);
    const endDate = new Date(day + 24 * 60 * 60 * 1000);

    const formatTime = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}000`;

    const formattedStartTime = formatTime(startDate);
    const formattedEndTime = formatTime(endDate);

    setLoading(true);
    fetchRangeData(deviceId, formattedStartTime, formattedEndTime)
      .then((fetchedData) => {
        const formattedData = fetchedData.map((item: any, index: number) => ({
          key: index,
          inference_time: item.inference_time,
          inference_result: item.inference_result === 1 ? 'O' : 'X',
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [deviceId, day]);

  const handleDateChange = (timestamp: number) => {
    setDay(timestamp); // 선택된 날짜를 업데이트
    console.log('Selected Timestamp:', timestamp);
  };

  const goToNextPage = () => router.push(nextPage);
  const goToPreviousPage = () => router.push(prevPage);
  const goToSettingpage = () => {
    router.push('./settings');
  };

  const { isBackgroundActive, setIsBackgroundActive } = useBackgroundContext();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (isBackgroundActive) {
        body.style.backgroundImage = "url('/wave-background.png')";
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center';
      } else {
        body.style.backgroundImage = 'none';
        body.style.background = '#F8F8FA';
      }
    }
  }, [isBackgroundActive]);

  return (
    <>
      <div className="container">
        {/* left side */}
        <div className="main-info">
          <div className="info-left">
            <h1>
              스마트 부표
              <br />
              바이오파울링
              <br />
              탐지 서비스
            </h1>
          </div>

          <div className="info-right">
            <p className="sensor-name">{deviceId} 센서 데이터</p>
            <div className="details">
              <img src="/setting.png" className="setting" alt="setting icon" onClick={goToSettingpage} />
              <img src="/human.png" className="human" alt="human icon" />
              <span className="users-names">
                {session ? session.user.name : '로그인 필요'} / <LogoutButton />
              </span>
            </div>
          </div>
        </div>

        <div className="estimate-bf-total">
          <div className="ebt-text"></div>
          <div className="inference">
            <RangeData data={data} loading={loading} />
          </div>
        </div>

        {/* middle sector */}
        <div className="select-data">
          <span className="text-space">데이터를 선택해주세요</span>
          <div className="date-buttons">
            <Dayselect onDateChange={handleDateChange} />
          </div>
        </div>

        <div className="now-danger">
          <div className="bio-result">
            <Latest deviceId={deviceId} />
          </div>
          <img src="/Wave1.png" className="wave1"></img>
          <img src="/Wave2.png" className="wave2"></img>
          <div className="nd-column">
            <span className="text-space">바이오파울링 예측 결과</span>
            <div className="nd-row">
              <img src="/danger.png" className="siren"></img>
            </div>
          </div>
        </div>
        <div className="chart main-chart">
          <h3>용존산소</h3>
          <div className="chart-box">
            <GraphOxygen deviceId={deviceId} day={day} data={data} />
          </div>
        </div>
        <div className="chart sub-chart1">
          <h3>염도</h3>
          <div className="chart-box">
            <GraphSalinity deviceId={deviceId} day={day} data={data} />
          </div>
        </div>
        <div className="chart sub-chart2">
          <h3>전기전도도</h3>
          <div className="chart-box">
            <GraphCondoc deviceId={deviceId} day={day} data={data} />
          </div>
        </div>
        <div className="chart sub-chart3">
          <h3>수온</h3>
          <div className="chart-box">
            <GraphTemperature deviceId={deviceId} day={day} data={data} />
          </div>
        </div>
        <div className="phs">
          <span className="text-space">수소이온(pH)</span>
          <div className="grid-1">
            <div className="box-in-box">
              <span className="box-text">평균</span>
              <div className="box-horizontal">
                <img src="/average.png" className="box-pic"></img>
                <span className="value">
                  <Mean sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">분산</span>

              <div className="box-horizontal">
                <img src="/variance.jpg" className="box-pic"></img>
                <span className="value">
                  <Variance sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최솟값</span>

              <div className="box-horizontal">
                <img src="/min.png" className="box-pic"></img>
                <span className="value">
                  <Min sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최댓값</span>

              <div className="box-horizontal">
                <img src="/max.png" className="box-pic"></img>
                <span className="value">
                  <Max sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="TDS">
          <span className="text-space">TDS(mg/L)</span>
          <div className="grid-2">
            <div className="box-in-box">
              <span className="box-text">평균</span>
              <div className="box-horizontal">
                <img src="/average.png" className="box-pic"></img>
                <span className="value">
                  <Mean sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">분산</span>

              <div className="box-horizontal">
                <img src="/variance.jpg" className="box-pic"></img>
                <span className="value">
                  <Variance sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최솟값</span>

              <div className="box-horizontal">
                <img src="/min.png" className="box-pic"></img>
                <span className="value">
                  <Min sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최댓값</span>

              <div className="box-horizontal">
                <img src="/max.png" className="box-pic"></img>
                <span className="value">
                  <Max sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="btn_left" onClick={goToPreviousPage}></div>
      <div className="btn_right" onClick={goToNextPage}></div>
    </>
  );
}
