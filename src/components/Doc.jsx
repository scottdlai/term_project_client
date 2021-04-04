import React from 'react';
import './Doc.css';

const Doc = () => {
  return (
    <div>
      <h1>Quiz API</h1>
      <div className='app-desc'>Team V8 Quiz API</div>
      <div className='app-desc'>
        More information:{' '}
        <a href='https://helloreverb.com'>https://helloreverb.com</a>
      </div>
      <div className='app-desc'>
        Contact Info: <a href='hello@helloreverb.com'>hello@helloreverb.com</a>
      </div>
      <div className='app-desc'>Version: 0.1</div>
      <div className='app-desc'>
        BasePath:/tonyminseokkim11/TeamV8QuizApi/0.1
      </div>
      <div className='license-info'>All rights reserved</div>
      <div className='license-url'>
        http://apache.org/licenses/LICENSE-2.0.html
      </div>
      <h2>Access</h2>
      <h2>
        <a name='__Methods'>Methods</a>
      </h2>
      [ Jump to <a href='#__Models'>Models</a> ]<h3>Table of Contents </h3>
      <div className='method-summary'></div>
      <h4>
        <a href='#ApiQuestion'>ApiQuestion</a>
      </h4>
      <ul>
        <li>
          <a href='#apiV0QuestionsQuestionIDDelete'>
            <code>
              <span className='http-method'>delete</span> /api/v0/questions/
              {'{questionID}'}
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuestionsQuestionIDPost'>
            <code>
              <span className='http-method'>post</span> /api/v0/questions/
              {'{questionID}'}
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuestionsQuestionIDPut'>
            <code>
              <span className='http-method'>put</span> /api/v0/questions/ ' '
              {'{ questionID }'}
            </code>
          </a>
        </li>
      </ul>
      <h4>
        <a href='#ApiQuiz'>ApiQuiz</a>
      </h4>
      <ul>
        <li>
          <a href='#apiV0QuizzesGet'>
            <code>
              <span className='http-method'>get</span> /api/v0/quizzes
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuizzesPost'>
            <code>
              <span className='http-method'>post</span> /api/v0/quizzes
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuizzesQuizIDDelete'>
            <code>
              <span className='http-method'>delete</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuizzesQuizIDGet'>
            <code>
              <span className='http-method'>get</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0QuizzesQuizIDPut'>
            <code>
              <span className='http-method'>put</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </a>
        </li>
      </ul>
      <h4>
        <a href='#ApiSubmission'>ApiSubmission</a>
      </h4>
      <ul>
        <li>
          <a href='#apiV0SubmissionsQuizIDGet'>
            <code>
              <span className='http-method'>get</span> /api/v0/submissions/
              {'{quizID}'}
            </code>
          </a>
        </li>
        <li>
          <a href='#apiV0SubmissionsQuizIDPost'>
            <code>
              <span className='http-method'>post</span> /api/v0/submissions/
              {'{quizID}'}
            </code>
          </a>
        </li>
      </ul>
      <h1>
        <a name='ApiQuestion'>ApiQuestion</a>
      </h1>
      <div className='method'>
        <a name='apiV0QuestionsQuestionIDDelete' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='delete'>
            <code className='huge'>
              <span className='http-method'>delete</span> /api/v0/questions/
              {'{questionID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Deletes a question with the specified ID (
          <span className='nickname'>apiV0QuestionsQuestionIDDelete</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>questionID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            question to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid username supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        User not found
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuestionsQuestionIDPost' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='post'>
            <code className='huge'>
              <span className='http-method'>post</span> /api/v0/questions/
              {'{questionID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Creates a question for the quiz (
          <span className='nickname'>apiV0QuestionsQuestionIDPost</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>questionID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            question to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>default</h4>
        successful operation
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuestionsQuestionIDPut' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='put'>
            <code className='huge'>
              <span className='http-method'>put</span> /api/v0/questions/
              {'{questionID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Updates a question (
          <span className='nickname'>apiV0QuestionsQuestionIDPut</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>questionID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            question to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid user supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        User not found
        <a href='#'></a>
      </div>
      <hr />
      <h1>
        <a name='ApiQuiz'>ApiQuiz</a>
      </h1>
      <div className='method'>
        <a name='apiV0QuizzesGet' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='get'>
            <code className='huge'>
              <span className='http-method'>get</span> /api/v0/quizzes
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Gets a list of recent quizzes (
          <span className='nickname'>apiV0QuizzesGet</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Consumes</h3>
        This API call consumes the following media types via the{' '}
        <span className='header'>Content-Type</span> request header:
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid ID supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        Quiz not found
        <a href='#'></a>
        <h4 className='field-label'>405</h4>
        Validation exception
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuizzesPost' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='post'>
            <code className='huge'>
              <span className='http-method'>post</span> /api/v0/quizzes
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Creates a new quiz (<span className='nickname'>apiV0QuizzesPost</span>
          )
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Consumes</h3>
        This API call consumes the following media types via the{' '}
        <span className='header'>Content-Type</span> request header:
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid ID supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        Quiz not found
        <a href='#'></a>
        <h4 className='field-label'>405</h4>
        Validation exception
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuizzesQuizIDDelete' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='delete'>
            <code className='huge'>
              <span className='http-method'>delete</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Deletes a quiz with the specified ID (
          <span className='nickname'>apiV0QuizzesQuizIDDelete</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>quizID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            quiz to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid username supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        User not found
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuizzesQuizIDGet' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='get'>
            <code className='huge'>
              <span className='http-method'>get</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Gets the quiz and its questions with quizID (
          <span className='nickname'>apiV0QuizzesQuizIDGet</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>quizID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            quiz to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>200</h4>
        successful operation
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0QuizzesQuizIDPut' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='put'>
            <code className='huge'>
              <span className='http-method'>put</span> /api/v0/quizzes/
              {'{quizID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Updates a quiz name (
          <span className='nickname'>apiV0QuizzesQuizIDPut</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>quizID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            quiz to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>200</h4>
        successful operation
        <a href='#'></a>
      </div>
      <hr />
      <h1>
        <a name='ApiSubmission'>ApiSubmission</a>
      </h1>
      <div className='method'>
        <a name='apiV0SubmissionsQuizIDGet' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='get'>
            <code className='huge'>
              <span className='http-method'>get</span> /api/v0/submissions/
              {'{quizID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Gets all the submissions for the quiz with quizID (
          <span className='nickname'>apiV0SubmissionsQuizIDGet</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>quizID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            quiz to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid ID supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        Quiz not found
        <a href='#'></a>
        <h4 className='field-label'>405</h4>
        Validation exception
        <a href='#'></a>
      </div>
      <hr />
      <div className='method'>
        <a name='apiV0SubmissionsQuizIDPost' />
        <div className='method-path'>
          <a className='up' href='#__Methods'>
            Up
          </a>
          <pre className='post'>
            <code className='huge'>
              <span className='http-method'>post</span> /api/v0/submissions/
              {'{quizID}'}
            </code>
          </pre>
        </div>
        <div className='method-summary'>
          Uploads a submission for the quiz (
          <span className='nickname'>apiV0SubmissionsQuizIDPost</span>)
        </div>
        <div className='method-notes'></div>
        <h3 className='field-label'>Path parameters</h3>
        <div className='field-items'>
          <div className='param'>quizID (required)</div>

          <div className='param-desc'>
            <span className='param-type'>Path Parameter</span> &mdash; ID of
            quiz to return format: int64
          </div>
        </div>
        <h3 className='field-label'>Consumes</h3>
        This API call consumes the following media types via the{' '}
        <span className='header'>Content-Type</span> request header:
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 className='field-label'>Produces</h3>
        This API call produces the following media types according to the{' '}
        <span className='header'>Accept</span> request header; the media type
        will be conveyed by the <span className='header'>Content-Type</span>{' '}
        response header.
        <ul>
          <li>
            <code>application/json</code>
          </li>
        </ul>
        <h3 classNameName='field-label'>Responses</h3>
        <h4 className='field-label'>400</h4>
        Invalid ID supplied
        <a href='#'></a>
        <h4 className='field-label'>404</h4>
        Quiz not found
        <a href='#'></a>
        <h4 className='field-label'>405</h4>
        Validation exception
        <a href='#'></a>
      </div>
      <hr />
      <h2>
        <a name='__Models'>Models</a>
      </h2>
      [ Jump to <a href='#__Methods'>Methods</a> ]<h3>Table of Contents</h3>
      <ol></ol>
    </div>
  );
};

export default Doc;
