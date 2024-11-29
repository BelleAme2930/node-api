import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>To-Do App API</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: 'Open Sans', sans-serif;
              background-color: #f7f8fa;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #333;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 15px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              max-width: 900px;
              width: 100%;
              padding: 40px;
              text-align: center;
            }
            h1 {
              font-size: 36px;
              color: #4caf50;
              margin-bottom: 20px;
              font-weight: bold;
            }
            .api-url {
              font-size: 20px;
              font-weight: 500;
              color: #ff5722;
              margin: 20px 0;
            }
            .api-url a {
              color: #ff5722;
              text-decoration: none;
              font-weight: 500;
            }
            .description p {
              font-size: 18px;
              color: #666;
              margin-bottom: 10px;
            }
            .description ul {
              list-style-type: none;
              padding-left: 0;
              text-align: left;
              margin: 20px 0;
            }
            .description li {
              font-size: 18px;
              color: #444;
              margin-bottom: 10px;
            }
            .card {
              background-color: #f9fafb;
              padding: 25px;
              border-radius: 10px;
              margin-top: 30px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
              color: #555;
            }
            .card h3 {
              color: #333;
              font-size: 20px;
              margin-bottom: 15px;
            }
            .requirements {
              font-size: 18px;
              color: #777;
            }
            .requirements ul {
              text-align: left;
            }
            .requirements li {
            margin-bottom: 10px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999;
              padding-top: 20px;
              border-top: 1px solid #f0f0f0;
            }
            .footer p {
              margin: 5px 0;
            }
            @media (max-width: 600px) {
              .container {
                padding: 20px;
              }
              h1 {
                font-size: 30px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to the To-Do App API</h1>
            <p class="api-url">API URL: <a href="https://node-api-umairsaif.net/api" target="_blank">https://node-api-umairsaif.net/api</a></p>

            <div class="description">
              <p>This project allows you to manage tasks with the following features:</p>
              <ul>
                <li><strong>Create a task:</strong> Name, Due Date, Status, Priority</li>
                <li><strong>Update a task:</strong> Change Status, Change Priority</li>
                <li><strong>Delete a task</strong></li>
                <li><strong>List tasks:</strong> With Pagination and Filter options</li>
                <li><strong>Fetch a single task</strong></li>
              </ul>
            </div>

            <div class="card">
              <h3>Technologies Used</h3>
              <p><strong>Node.js (Backend) Framework: </strong>NestJS</p>
              <p><strong>Database: </strong>PostgreSQL</p>
            </div>

            <div class="card requirements">
              <h3>Project Requirements</h3>
              <ul>
                <li>Pagination for task listing</li>
                <li>Filter tasks by Status and Priority</li>
                <li>Task States: Pending, Done, In Progress, Paused</li>
                <li>Task Priorities: Red (High), Yellow (Medium), Blue (Normal)</li>
              </ul>
            </div>

            <div class="footer">
              <p>For more details, explore the API documentation.</p>
              <p>Note: This project is deployed and ready to use!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
