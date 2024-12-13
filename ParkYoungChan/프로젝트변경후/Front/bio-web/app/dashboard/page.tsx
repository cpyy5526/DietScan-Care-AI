'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import GraphOxygen from '@/components/GraphOxygen';
import GraphCondoc from '@/components/GraphConduc';
import GraphSalinity from '@/components/GraphSalinity';
import GraphTemperature from '@/components/GraphTemperature';
import '@/styles/dashboardstyle.css';

export default function Home() {
  const deviceId = 'wando02';
  const day = Date.now();

  return (
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
          <p className="sensor-name">Wando2 센서 데이터</p>
          <div className="details">
            <img src="setting.png" className="setting" alt="setting icon" />
            <img src="human.png" className="human" alt="human icon" />
            <span className="users-names">
              이경직님 / 로그아웃
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
    </div>
  );
}

// {oxygen.length > 0 && <GraphOxygen result={oxygen} />}
