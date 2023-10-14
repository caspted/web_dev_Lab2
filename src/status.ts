import { oneMonthDeadline } from "./deadline";

export interface LoanDetails {
  person_name: string;
  loan_amount: number;
  deadlineDate: Date;
}

export function details(loan: LoanDetails): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loan Details</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        .loan-details {
          margin-top: 20px;
          text-align: left;
        }

        .detail-item {
          margin-bottom: 10px;
        }

        .label {
          font-weight: bold;
          color: #555;
        }

        .value {
          color: #333;
        }
          
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Loan Details</h1>
        <div class="loan-details">
          <div class="detail-item">
            <span class="label">Name:</span>
            <span class="value">${loan.person_name}</span>
          </div>
          <div class="detail-item">
            <span class="label">Loan Amount:</span>
            <span class="value">$${loan.loan_amount.toFixed(2)}</span>
          </div>
          <div class="detail-item">
          <span class="label">Application Date:</span>
          <span class="value">${new Date().toLocaleString()}</span>
          </div>
          <div class="detail-item">
          <span class="label">Deadline:</span>
          <span class="value">${oneMonthDeadline()}</span>
          </div>
          </body>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
 }