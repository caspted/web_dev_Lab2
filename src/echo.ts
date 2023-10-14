import { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import client from './database';
import crypto from 'node:crypto';
import { details } from './status';

export async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/apply-loan') {
    const contents = await fs.readFile('apply-loan.html', 'utf-8');
    response.writeHead(200, { 'Content-Type': 'text/html' }).end(contents.toString());
  } else if (url?.startsWith('/apply-loan-success')) {
    const queryParameters = new URLSearchParams(url.split('?')[1]);
    const name = queryParameters.get('name');
    const email = queryParameters.get('email');
    const phone = queryParameters.get('phone');
    const loanAmountParam = queryParameters.get('loan_amount');

    if (loanAmountParam !== null) {
      const loanAmount = parseInt(loanAmountParam);

      const reason = queryParameters.get('reason');
      const status = 'APPLIED';
      const uniqueToken = crypto.randomBytes(32).toString('base64url');

      const insertQuery = `
        INSERT INTO loans (person_name, person_email, person_phone, loan_amount, loan_reason, status, unique_token)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      const values = [name, email, phone, loanAmount, reason, status, uniqueToken];

      try {
        await client.query(insertQuery, values);
        response.writeHead(302, { Location: `/loan-status?token=${uniqueToken}` });
        response.end();
      } catch (error) {
        console.error('Error inserting data:', error);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('There is an error with your request.');
      }
    }
  } else if (url?.startsWith('/loan-status')) {
    const queryParameters = new URLSearchParams(url.split('?')[1]);
    const token = queryParameters.get('token');

    const selectQuery = `
        SELECT * FROM loans
        WHERE unique_token = $1
      `;

    try {
      const result = await client.query(selectQuery, [token]);
      const loan = result.rows[0];

      if (!loan) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Loan not found.');
        return;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(details(loan));
    } catch (error) {
      console.error('Error fetching loan data:', error);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Something went wrong while processing your request.');
    }
  } else {
    response.writeHead(200).end('Have this echo server as your safe space');
  }
}
