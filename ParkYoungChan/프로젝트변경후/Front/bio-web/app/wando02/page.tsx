'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GraphOxygen from '@/components/GraphOxygen';
import GraphCondoc from '@/components/GraphConduc';
import GraphSalinity from '@/components/GraphSalinity';
import GraphTemperature from '@/components/GraphTemperature';
import Max from '@/components/max';
import Min from '@/components/min';
import Mean from '@/components/mean';
import Variance from '@/components/variance';
import LogoutButton from '@/components/LogoutButton';

import '@/styles/dashboardstyle.css';

export default function Home() {
  const deviceId = 'wando02';
  const router = useRouter();
  const [day, setDay] = useState(Date.now());

  const handleDateChange = (timestamp: number) => {
    setDay(timestamp); // 선택된 날짜를 업데이트
    console.log('Selected Timestamp:', timestamp);
  };
  const goToNextPage = () => {
    router.push('/wando01'); // 이동할 페이지 경로
  };

  const goToPreviousPage = () => {
    router.push('/wando01b'); // 이동할 페이지 경로
  };
  const goToSettingpage = () => {
    router.push('/settings');
  };

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
              <img src="setting.png" className="setting" alt="setting icon" onClick={goToSettingpage} />
              <img src="human.png" className="human" alt="human icon" />
              <span className="users-names">
                이경직님 / <LogoutButton />
              </span>
            </div>
          </div>
        </div>

        <div className="estimate-bf-total">
          <div className="ebt-text">
            <span className="text-space1">최근에 예측한 바이오파울링 시간</span> <span className="text-space1">위험도</span>
          </div>
        </div>

        {/* middle sector */}
        <div className="select-data">
          <span className="text-space">데이터를 선택해주세요</span>
        </div>

        <div className="now-danger">
          <div className="bio-result">O</div>
          <img src="Wave1.png" className="wave1"></img>
          <img src="Wave2.png" className="wave2"></img>
          <div className="nd-column">
            <span className="text-space">바이오파울링 예측 결과</span>
            <div className="nd-row">
              <img src="danger.png" className="siren"></img>
            </div>
          </div>
        </div>
        <div className="chart main-chart">
          <h3>용존산소</h3>
          <div className="chart-box">
            <GraphOxygen deviceId={deviceId} day={day} />
          </div>
        </div>
        <div className="chart sub-chart1">
          <h3>염도</h3>
          <div className="chart-box">
            <GraphSalinity deviceId={deviceId} day={day} />
          </div>
        </div>
        <div className="chart sub-chart2">
          <h3>전기전도도</h3>
          <div className="chart-box">
            <GraphCondoc deviceId={deviceId} day={day} />
          </div>
        </div>
        <div className="chart sub-chart3">
          <h3>수온</h3>
          <div className="chart-box">
            <GraphTemperature deviceId={deviceId} day={day} />
          </div>
        </div>
        <div className="phs">
          <span className="text-space">수소이온(pH)</span>
          <div className="grid-1">
            <div className="box-in-box">
              <span className="box-text">평균</span>
              <div className="box-horizontal">
                <img src="average.png" className="box-pic"></img>
                <span className="value">
                  <Mean sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">분산</span>

              <div className="box-horizontal">
                <img src="variance.jpg" className="box-pic"></img>
                <span className="value">
                  <Variance sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최솟값</span>

              <div className="box-horizontal">
                <img src="min.png" className="box-pic"></img>
                <span className="value">
                  <Min sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최댓값</span>

              <div className="box-horizontal">
                <img src="max.png" className="box-pic"></img>
                <span className="value">
                  <Max sensor_name={deviceId} sensor_value="hydrogen" what_value="ph" day={day} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="TDS">
          <span className="text-space">TDS(ppm)</span>
          <div className="grid-2">
            <div className="box-in-box">
              <span className="box-text">평균</span>
              <div className="box-horizontal">
                <img src="average.png" className="box-pic"></img>
                <span className="value">
                  <Mean sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">분산</span>

              <div className="box-horizontal">
                <img src="variance.jpg" className="box-pic"></img>
                <span className="value">
                  <Variance sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최솟값</span>

              <div className="box-horizontal">
                <img src="min.png" className="box-pic"></img>
                <span className="value">
                  <Min sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>

            <div className="box-in-box">
              <span className="box-text">최댓값</span>

              <div className="box-horizontal">
                <img src="max.png" className="box-pic"></img>
                <span className="value">
                  <Max sensor_name={deviceId} sensor_value="conductivity" what_value="tds" day={day} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn_left" onClick={goToPreviousPage}>
        이전
      </button>
      <button className="btn_right" onClick={goToNextPage}>
        다음
      </button>
    </>
  );
}

// {oxygen.length > 0 && <GraphOxygen result={oxygen} />}
