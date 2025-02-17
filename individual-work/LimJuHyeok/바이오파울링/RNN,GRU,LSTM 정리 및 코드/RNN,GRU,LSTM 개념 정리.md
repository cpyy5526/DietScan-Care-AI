# RNN,GRU,LSTM 개념 정리

CNN : 이미지 구역별로 같은 weight를 공유한다.

RNN은 시간 별로 같은 weight를 공유한다 → 즉, 과거와 현재는 같은 weight를 공유한다.

### First Order System

- 개념 : x가 x-1의 상태와 관련이 있다
    - e.g., x0 → x1 → x2
- FOS은 외부 입력 없이 자기 혼자서 돌아간다.
- 현재 시간의 상태가 이전 시간의 상태와, 현재의 입력에 관계가 있는 경우
    
    ![스크린샷 2024-11-02 오후 4.15.28.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.15.28.png)
    

---

### State-Space Model

- 관측 가능한 변수들의 모음을 만들어줘야함.
    
    ![스크린샷 2024-11-02 오후 4.17.11.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.17.11.png)
    
- 즉, 위와 같이 x와 y가 정의되는 경우를 우리는 First order system의 state space model이다 라고 부름.

그림으로 표현하면?

![스크린샷 2024-11-02 오후 4.22.36.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.22.36.png)

- RNN 특징 : 셀프 피드백 루프가 있음 → 시간에 따라 변화하는 것에 대한 weight를 공유한다

---

입력과 출력의 관계는 보이지 않는 hidden layer가 존재.

hidden layer의 상태를 hidden state라고 부름. 

---

### RNN

![스크린샷 2024-11-02 오후 4.26.49.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.26.49.png)

- Weight (Wxx) 공유
- 셀프 피드백
- x0 : 초기 조건
    - 초기 조건도 정의를 해줘야 함.
- Xt는 이전까지의 상태와, 입력을 모두 대표할 수 있는 압축본이라고 할 수 있다 (100% 장담은 못하지만)

- 예제
    
    ![스크린샷 2024-11-02 오후 4.33.16.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.33.16.png)
    

---

뉴럴 네트워크 

![스크린샷 2024-11-02 오후 4.36.41.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.36.41.png)

사용하는 parameter matrix는 총 5개이다.

![스크린샷 2024-11-02 오후 4.37.49.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.37.49.png)

---

### RNN Training

- ANN, CNN에서처럼 back-propagation을 이용한다.
    - Back propagation이란? (오차역전파)
        1. 내가 뽑고자 하는 타겟값과 모델이 계산한 output값이 얼마나 있는지 계산
        2. 그 오차값을 뒤로 전파해나가면서 각 노드가 가지고 있는 weight 값들을 업데이트
            
            ![스크린샷 2024-11-02 오후 4.47.19.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.47.19.png)
            
        - Forward Pass (순방향 계산) 개념이 등장
        - x가 얼만큼 변했을 때, q는 얼마만큼 변했는가?

### RNN: Problem Types

- Many-to-many : 번역에 많이 쓰임
- Many-to-one : 예측에 많이 쓰임 (단어 예측)
- One-to-many : 생성에 많이 쓰임 (문장 생성)

- sequence-to-sequence : many-to-one + one-to-many

![스크린샷 2024-11-02 오후 4.44.44.png](RNN,GRU,LSTM%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%2013208556ef3880c5bfbeda1cdebb96e7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-11-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.44.44.png)

---

## GRU, LSTM

- RNN의 단점을 보완

1. RNN이 어떤 한계점을 가지고 있는가?
    - 곱해지는 Wxx값이 1보다 크다면? → 무한대로 발산 (언젠가)
    - 곱해지는 Wxx값이 1보다 작다면? → 0으로 수렴 (언젠가)

- RNN Exploding Gradient
    
    학습 도중 loss가 inf가 뜰경우 : 학습이 더 이상 진행이 불가
    
- RNN Vanishing Gradient
    
    학습 도중 파악이 어렵다.
    

Gated RNN : LSTM / GRU

- Gradient flow를 제어할 수 있는 “밸브” 역할을 함.

---

### LSTM (long short-term memory)

- state space의 입력,상태,출력 구조는 동일함
    - Gate 구조의 추가
    - 4개의 MLP(뉴럴 네트워크) 구조

1. Forget Gate
    
    Step1. 새로운 입력과 이전 상태를 참조해서
    
    - 이 정보를 얼마의 비율로 사용할 것인가를 결정
    - (또는) 얼마나 잊어버릴 것인가?

1. Input Gate
    
    Step2. 새로운 입력과 이전 상태를 참조해서
    
    - 이 정보를 얼마나 활용할 것인가를 결정
    - (+) 어떤 정보를 활용할 것인가도 결정

1. Cell Gate
    
    Step3: Step1과 step2를 적절히 섞는 단계
    
2. Output gate
    - 정보를 모두 결합해서, 다음 상태를 결정

### GRU는 Cell state가 없음.

- LSTM보다 파라미터 수가 적으므로 traning time이 절약된다.
- LSTM보다 GRU가 성능이 좋은가? → Task에 따라 천차만별이다.
- 하지만 RNN보다는 LSTM과 GRU가 확실한 성능을 보장한다.

→ 결론 : LSTM과 GRU 둘다 써보고 비교해보는 것이 중요.