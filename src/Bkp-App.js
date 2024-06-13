import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css';

const App = () => {
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [userAns, setUserAns] = useState([]);
  const [isExamStart, setIsExamStart] = useState(false);
  const [resultText, setResultText] = useState('');
  const [timerSecond, setTimerSecond] = useState(0);

  const setQuestionHandler = () => {
    let operation = ['+', '-', '*', '/'];
    let questionArrObj = [];
    if (parseInt(totalQuestions) <= 0) {
      return false;
    }
    if (parseInt(totalQuestions) > 100) {
      return false;
    }
    for (let i = 1; i <= totalQuestions; i++) {
      let obj = {};
      let _num1 = Math.random() * 10;
      let _num2 = Math.random() * 10;
      _num1 = _num1.toFixed(2);
      _num2 = _num2.toFixed(2);
      let _act = operation[Math.floor(Math.random() * 3) + 1];
      let _res = parseFloat(0);
      if (_act === '+') {
        _res = parseFloat(_num1) + parseFloat(_num2);
        _res = _res.toFixed(2);
        obj['question'] = _num1 + ' + ' + _num2 + ' = ? ';
      }
      if (_act === '-') {
        _res = parseFloat(_num1) - parseFloat(_num2);
        _res = _res.toFixed(2);
        obj['question'] = _num1 + ' - ' + _num2 + ' = ? ';
      }
      if (_act === '*') {
        _res = parseFloat(_num1) * parseFloat(_num2);
        _res = _res.toFixed(2);
        obj['question'] = _num1 + ' x ' + _num2 + ' = ? ';
      }
      if (_act === '/') {
        _res = parseFloat(_num1) / parseFloat(_num2);
        _res = _res.toFixed(2);
        obj['question'] = _num1 + ' / ' + _num2 + ' = ? ';
      }

      obj['result'] = _res;
      obj['status'] = '';
      questionArrObj.push(obj);
    }
    setQuestions(questionArrObj);
    setIsExamStart(true);
    setTimerSecond(totalQuestions * 100);
  };

  const resetQuestionHandler = () => {
    setQuestions([]);
    setIsExamStart(false);
    setTotalQuestions(5);
    setResultText('');
    setTimerSecond(0);
  };

  const userAnswerInputHandler = (evt, index) => {
    let _tempUserAns = [...userAns];
    _tempUserAns[index] = evt.target.value;
    setUserAns(_tempUserAns);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    //console.log(userAns);
    let _wrongAnsCount = 0;
    let _tempQuestions = [...questions];
    if (_tempQuestions.length > 0) {
      _tempQuestions.map((item, index) => {
        return item.result === userAns[index]
          ? (_tempQuestions[index].status = 'CORRECT')
          : (_tempQuestions[index].status = 'WRONG');
      });
    }
    setQuestions(_tempQuestions);
    questions.filter((item) => {
      return item.status === 'WRONG' ? _wrongAnsCount++ : _wrongAnsCount;
    });
    setResultText(
      `Wrong answer: ${_wrongAnsCount} out of ${totalQuestions} questions`
    );
    //console.log(questions);
  };

  const pageReloadHandler = () => {
    window.location.reload();
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className='timer'>Too lale...</div>;
    }

    return (
      <div className='timer'>
        <div className='text'>Remaining</div>
        <div className='value' style={{ fontWeight: '600' }}>
          {remainingTime}
        </div>
        <div className='text'>seconds</div>
      </div>
    );
  };

  return (
    <>
      <Container>
        <div className={'timer-box' + (!isExamStart ? ' d-none' : '')}>
          <CountdownCircleTimer
            isPlaying={isExamStart}
            duration={timerSecond}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {renderTime}
          </CountdownCircleTimer>
          <Button
            variant='danger'
            size='sm'
            className='mt-2'
            onClick={pageReloadHandler}
          >
            Reload
          </Button>{' '}
        </div>
        <Row className='mt-3'>
          <Col md={{ span: 8, offset: 2 }}>
            <h3>
              <strong>A Mathematical Application By REACT !!!</strong>
            </h3>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md={{ span: 8, offset: 2 }}>
            <Table size='sm' variant='dark'>
              <tbody>
                <tr>
                  <td>
                    <label>Number Of Question:</label>
                    <input
                      type='number'
                      min={1}
                      step={1}
                      max={100}
                      maxLength={3}
                      name='question_no'
                      id='questionNumber'
                      className='mx-3 onex-numtxtb'
                      placeholder='5'
                      value={totalQuestions}
                      required
                      disabled={isExamStart ? true : false}
                      onChange={(e) => setTotalQuestions(e.target.value)}
                    />
                    <span>Max: 100</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button
                      type='button'
                      variant='warning'
                      className={isExamStart ? '' : 'd-none'}
                      onClick={resetQuestionHandler}
                    >
                      Reset?
                    </Button>{' '}
                    <Button
                      type='button'
                      variant='light'
                      disabled={totalQuestions < 5 ? true : false}
                      className={isExamStart ? 'd-none' : ''}
                      onClick={setQuestionHandler}
                    >
                      Take Exam
                    </Button>{' '}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Form onSubmit={formSubmitHandler}>
          <Row className='mt-3'>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>SL</th>
                    <th>QUESTION</th>
                    <th style={{ width: '160px' }}>ANSWER</th>
                    <th style={{ width: '150px' }}>RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.length > 0 &&
                    questions.map((item, index) => {
                      return (
                        <tr key={'questionSet' + index}>
                          <td>{index + 1}</td>
                          <td style={{ fontWeight: '600' }}>{item.question}</td>
                          <td>
                            <input
                              type='number'
                              className='onex-numtxtb'
                              name={'ans[' + index + ']'}
                              id={'ans' + index}
                              required
                              placeholder='?'
                              step='0.01'
                              onChange={(e) => userAnswerInputHandler(e, index)}
                            />
                          </td>
                          <td style={{ fontWeight: '600' }}>
                            {item.status === 'CORRECT' ? (
                              <span className='text-success'>Correct!</span>
                            ) : (
                              <span className='text-danger'>{item.status}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  {questions.length === 0 && (
                    <tr>
                      <td colSpan={4}>No Questions Found!</td>
                    </tr>
                  )}
                </tbody>
                {questions.length > 0 && (
                  <tfoot>
                    <tr>
                      <td
                        colSpan={3}
                        style={{ fontWeight: '600', color: '#fff' }}
                        className={resultText !== '' ? 'bg-dark' : ''}
                      >
                        {resultText}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Button type='submit' variant='primary'>
                          Submit
                        </Button>{' '}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </Table>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default App;
