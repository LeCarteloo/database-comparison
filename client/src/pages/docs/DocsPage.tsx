import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useEffect } from 'react';
import * as S from './Docspage.styled';

const DocsPage = () => {
  useEffect(() => {
    Prism.highlightAll();
  });

  const sections = [
    {
      id: 'Insert',
      title: '1. Insert',
      desc: ``,
      subSections: [
        {
          subTitle: 'All',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query:
                "INSERT INTO salary(employee_id, salary, from_date, to_date) VALUES ${salary .splice(0, amount) .map( (val) => `(${val.employee_id}, ${val.salary}, ${val.from_date}, ${val.to_date})`, ).join(',')};",
            },
            {
              name: 'Clickhouse',
              query: `this.conn.insert({
                  table: 'salary',
                  values: JSON.parse('[valuesToAdd]'),
                  format: 'JSONEachRow',
                });`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').insertMany(salary.splice(0, amount));`,
            },
            {
              name: 'ArangoDB',
              query: `this.conn.collection('salary').import(salary.splice(0, amount));`,
            },
          ],
        },
      ],
    },
    {
      id: 'select',
      title: '2. Select',
      desc: ``,
      subSections: [
        {
          subTitle: 'Easy',
          queries: [
            {
              name: 'Mysql, Pgsql, ClickHouse',
              query: 'SELECT * FROM salary s WHERE s.salary >= 3000',
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').find({ salary: { $gte: 5000, $lt: 8000 } }).toArray();`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000 AND doc.salary < 8000
              RETURN doc;`,
            },
          ],
        },
        {
          subTitle: 'Medium',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: `SELECT id,
              first_name,
              last_name,
              gender,
              hire_date,
              s.how_many_withdrawals,
              s.smallest_payout,
              s.biggest_payout,
              s.sum_salary,
              t.how_many_titles,
              t.last_promotion
       FROM employees AS e
       LEFT JOIN
         (SELECT count(salary) AS how_many_withdrawals,
                 max(salary) AS biggest_payout,
                 min(salary) AS smallest_payout,
                 sum(salary) AS sum_salary,
                 employee_id
          FROM salary
          GROUP BY employee_id) AS s ON e.id = s.employee_id
       LEFT JOIN
         (SELECT count(title) AS how_many_titles,
                 employee_id,
                 MAX(from_date) AS last_promotion
          FROM titles
          GROUP BY employee_id) AS t ON e.id = t.employee_id
       WHERE gender = 'F'
         AND hire_date < '2015-01-01'
         AND last_promotion < '2020-01-01'
         AND sum_salary > 100000
       ORDER BY sum_salary DESC`,
            },
            {
              name: 'ClickHouse',
              query: `SELECT 
              e.id, e.first_name, e.last_name, e.gender, e.hire_date, 
              s.how_many_withdrawals,s.smallest_payout, s.biggest_payout, s.sum_salary, 
              t.how_many_titles, t.last_promotion 
            FROM 
              employees e, 
              (SELECT 
                  count(salary) as how_many_withdrawals, 
                  min(salary) as smallest_payout, 
                  max(salary) as biggest_payout, 
                  sum(salary) as sum_salary, 
                  employee_id 
                FROM 
                  salary 
                GROUP BY 
                  employee_id) AS s, 
              (SELECT 
                  count(title) as how_many_titles, 
                  MAX(from_date) as last_promotion, 
                  employee_id 
                FROM 
                  titles 
                GROUP BY 
                  employee_id) AS t 
            WHERE 
              e.id = s.employee_id AND 
              e.id = t.employee_id AND 
              e.gender = 'F' AND 
              e.hire_date < '2015-01-01' AND 
              s.sum_salary > 100000 
            ORDER BY 
              s.sum_salary DESC`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').find().toArray()`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              RETURN doc`,
            },
          ],
        },
        {
          subTitle: 'Hard',
          queries: [
            {
              name: 'Mysql, Pgsql, ClickHouse',
              query: `SELECT * FROM salary AS s, employees AS e, titles AS t WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').find({ salary: { $gte: 5000 } }).toArray();`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000
              RETURN doc`,
            },
          ],
        },
      ],
    },
    {
      id: 'update',
      title: '3. Update',
      desc: ``,
      subSections: [
        {
          subTitle: 'Easy',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: 'UPDATE salary SET salary = 2500 WHERE salary < 2000',
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              salary 
            UPDATE 
              salary = 2500 
            WHERE 
              salary < 2000`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').updateMany({ salary: { $gte: 5000, $lt: 8000 } }, { $set: { salary: 2500 } });`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000 AND doc.salary < 8000
              UPDATE doc WITH { salary: 2500 } IN salary
              RETURN doc`,
            },
          ],
        },
        {
          subTitle: 'Medium',
          queries: [
            {
              name: 'Mysql',
              query: `UPDATE employees AS e
              INNER JOIN salary AS s
                ON s.employee_id = e.id
            SET s.salary = 4500
            WHERE e.gender = 'M' AND s.salary < 3000 AND e.hire_date > '2000-01-01'`,
            },
            {
              name: 'Pgsql',
              query: `UPDATE salary AS s
              SET salary = 4500
            FROM employees AS e
            WHERE s.employee_id = e.id
              AND e.gender = 'M' 
              AND s.salary < 3000 
              AND e.hire_date > '2000-01-01'`,
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              salary 
            UPDATE 
              salary = 4500 
            WHERE 
              employee_id IN ( 
                SELECT 
                  id 
                FROM 
                  employees 
                WHERE 
                  gender = 'M' AND 
                  hire_date > '2000-01-01' 
              ) AND 
              salary < 3000`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').updateMany({ salary: { $gte: 5000 } }, { $set: { salary: 2500 } })`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000
              UPDATE doc WITH { salary: 2500 } IN salary
              RETURN doc`,
            },
          ],
        },
        {
          subTitle: 'Hard',
          queries: [
            {
              name: 'Mysql',
              query: `WRONG'`,
            },
            {
              name: 'Pgsql',
              query: `UPDATE employees
              SET hire_date = '2023-01-01'
              WHERE id IN (
              SELECT e.id
              FROM salary s
              JOIN employees e ON e.id = s.employee_id
              JOIN titles t ON e.id = t.employee_id
              WHERE s.salary > 2000 AND s.salary < 10000`,
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              employees 
            UPDATE 
              hire_date = '2023-01-01'
            WHERE 
              id IN (
                SELECT DISTINCT 
                  e.id 
                FROM 
                  salary s, 
                  employees e, 
                  titles t 
                WHERE 
                  e.id = s.employee_id AND 
                  e.id = t.employee_id AND 
                  s.salary > 2000 AND 
                  s.salary < 10000
                ) `,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').updateMany({}, { $set: { salary: 2500 } });`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              UPDATE doc WITH { salary: 2500 } IN salary
              RETURN doc`,
            },
          ],
        },
      ],
    },
    {
      id: 'delete',
      title: '4. Delete',
      desc: ``,
      subSections: [
        {
          subTitle: 'Easy',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: `DELETE FROM titles WHERE title = 'Junior BackEnd';`,
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              titles 
            DELETE WHERE 
              title = 'Junior BackEnd'`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').deleteMany({ salary: { $gte: 5000, $lt: 8000 } });`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000 AND doc.salary < 8000
              REMOVE doc IN salary
              RETURN doc`,
            },
          ],
        },
        {
          subTitle: 'Medium',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: `DELETE FROM salary WHERE salary > 1500 AND salary < 7500 AND from_date > '2011-01-01' AND to_date < '2020-01-01'`,
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              salary 
            DELETE WHERE 
              salary > 1500 AND 
              salary < 7500 AND 
              from_date > '2011-01-01' AND 
              to_date < '2020-01-01'`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').deleteMany({});`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              REMOVE doc IN salary
              RETURN doc`,
            },
          ],
        },
        {
          subTitle: 'Hard',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: `DELETE FROM 
              employees 
            WHERE 
              id IN (SELECT DISTINCT e.id FROM salary s, employees e, titles t WHERE e.id = s.employee_id AND e.id = t.employee_id  AND s.salary > 2000)'`,
            },
            {
              name: 'ClickHouse',
              query: `ALTER TABLE 
              employees 
            DELETE WHERE 
              id IN (
                SELECT DISTINCT 
                  e.id 
                FROM 
                  salary s, 
                  employees e, 
                  titles t 
                WHERE 
                  e.id = s.employee_id AND 
                  e.id = t.employee_id AND 
                  s.salary > 2000
                )`,
            },
            {
              name: 'MongoDB',
              query: `this.conn.db.collection('salary').deleteMany({ salary: { $gte: 5000 } })`,
            },
            {
              name: 'ArangoDB',
              query: `FOR doc IN salary
              FILTER doc.salary >= 5000
              REMOVE doc IN salary
              RETURN doc`,
            },
          ],
        },
      ],
    },
  ];

  const tables = [
    {
      headers: [
        'id',
        'birth_date',
        'first_name',
        'last_name',
        'gender',
        'hire_date',
      ],
      data: ['1', '1990-01-13', 'Peri', 'Brenn', 'M', '2017-11-07'],
    },
    {
      headers: ['employee_id', 'salary', 'from_date', 'to_date'],
      data: ['63', '2782', '2020-09-25', '2017-02-28'],
    },
    {
      headers: ['employee_id', 'title', 'from_date', 'to_date'],
      data: ['4', 'Manager', '2014-06-08', '2018-12-26'],
    },
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <S.Header>
        <h1>Documentation</h1>
      </S.Header>
      <S.ContentBlock>
        <p>
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          dolore laudantium odio facilis. */}
        </p>
        <div style={{ margin: '1em 0' }}>
          <div>Table of Contents</div>
          <S.ContentList>
            {sections.map((section) => (
              <li key={section.id} style={{ padding: '0.1em 0' }}>
                <S.ContentLink href={`#${section.id}`}>
                  {section.title}
                </S.ContentLink>
              </li>
            ))}
          </S.ContentList>
        </div>
        <section>
          <h2>Appearance of database</h2>
          {tables.map((table, i) => (
            <S.Table key={i}>
              <thead>
                <tr>
                  {table.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {table.data.map((dat) => (
                    <td key={dat}>{dat}</td>
                  ))}
                </tr>
              </tbody>
            </S.Table>
          ))}
        </section>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 style={{ marginTop: '0.5em' }}>{section.title}</h2>
            <p>{section.desc}</p>
            {section.subSections.map((subSection) => (
              <div key={subSection.subTitle}>
                <h3 style={{ marginTop: '0.7em', color: '#6fcf97' }}>
                  Level: {subSection.subTitle}
                </h3>
                {subSection.queries.map((query) => (
                  <div key={query.name}>
                    <h4 style={{ marginTop: '0.6em' }}>- {query.name}</h4>
                    <pre>
                      <code className="language-js">{query.query}</code>
                    </pre>
                  </div>
                ))}
              </div>
            ))}
          </section>
        ))}
      </S.ContentBlock>
    </motion.div>
  );
};

export default DocsPage;
