import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Input, Select, Space, Card, Tag } from 'antd';
import axios from '../store/axios';

// 定义一个函数，用于异步调用Get方法，获取随机数
async function fetchRandomValues() {
    try {
      const response = await axios.get('/challenges/random');
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
}
// 定义一个函数，用于异步调用Post方法，提交用户答案
async function fetchAttempt(factorA: string, factorB: string, result: string, username: string) {
    try {
        // 定义一个对象，用于存储用户提交的数据
        const obj = {
            factorA: factorA,
            factorB: factorB,
            guess: result,
            userAlias: username
        };
        const response = await axios.post('/attempts', obj);
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
}


const App: React.FC = () => {
    const [factorA, setFactorA] = useState(['0']);
    const [factorB, setFactorB] = useState(['0']);
    const [userAlias, setUserAlias] = useState(['']);
    const [guess, setGuess] = useState(['']);
    const [result, setResult] = useState(false);

    useEffect(() => {
        // 载入页面时，调用该函数，自动获取随机数
        fetchRandomValues().then(resolvedData => {
            setFactorA(resolvedData.factorA);
            setFactorB(resolvedData.factorB);
          });
      }, []);

    const handleClickRandom = () => {
        // 点击按钮时，调用该函数，获取随机数
        fetchRandomValues().then(resolvedData => {
            setFactorA(resolvedData.factorA);
            setFactorB(resolvedData.factorB);
          });
    }

    const handleVerifyResult = () => {
        // 验证计算结果结果
        fetchAttempt(factorA, factorB, guess, userAlias).then(resolvedData => {
            console.log(resolvedData);
            setResult(resolvedData.correct);
          });
    };

    const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value);
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAlias(e.target.value);
    };

    return (
        <Card title="乘法游戏" bordered={false} style={{ width: 800 }}>
            <div>
                <Button type="primary" onClick={handleClickRandom}>生成随机数</Button>
            </div>
            <br />
            <div>
            A：<Tag color="magenta">{factorA}</Tag>
            B：<Tag color="green">{factorB}</Tag>
            </div>
            <br />
            <div>
                <Input
                    onChange={handleGuessChange}
                    style={{ width: '50%' }}
                    placeholder="两数之乘积"
                    value={guess}
                    />
            </div>
            <br />
            <div>
                <Input
                    onChange={handleUserChange}
                    style={{ width: '50%' }}
                    placeholder="用户名"
                    value={userAlias}
                />
            </div>
            <br />
            <div>
                <Button type="primary" onClick={handleVerifyResult}>提交</Button>
            </div>
            <br />
            <div>
                结果: <Tag color="blue">{result ? '你答对了': '你答错了'}</Tag>
            </div>
        </Card>
    );
};

export default App;