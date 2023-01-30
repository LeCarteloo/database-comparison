import * as S from './Docspage.styled';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const DocsPage = () => {
  useEffect(() => {
    Prism.highlightAll();
  });

  const sections = [
    {
      id: 'select',
      title: '1. Select',
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
      dolore laudantium odio facilis alias distinctio, voluptatum minima
      facere. Nostrum, fuga!`,
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
              query: `mongoose.connection.db.collection('salary').find({ salary: { $gte: 3000 } })`,
            },
          ],
        },
        {
          subTitle: 'Medium',
          queries: [
            {
              name: 'Mysql, Pgsql, ClickHouse',
              query: `SELECT * FROM salary AS s, employees AS e, titles AS t WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id`,
            },
            {
              name: 'MongoDB',
              query: `Not yet implemented`,
            },
          ],
        },
        {
          subTitle: 'Hard',
          queries: [
            {
              name: 'Mysql, Pgsql',
              query: `SELECT id, first_name, last_name, gender, hire_date, s.how_many_withdrawals, s.smallest_payout, s.biggest_payout, t.how_many_titles, t.last_promotion
              FROM employees AS e
              LEFT JOIN(SELECT count(salary) as how_many_withdrawals, max(salary) as biggest_payout, min(salary) as smallest_payout, employee_id FROM salary
              GROUP BY employee_id) AS s
              ON e.id = s.employee_id
              LEFT JOIN(SELECT count(title) as how_many_titles, employee_id, MAX(from_date) as last_promotion FROM titles GROUP BY employee_id) AS t
              ON e.id = t.employee_id`,
            },
            {
              name: 'ClickHouse',
              query: `SELECT e.id, e.first_name, e.last_name, e.gender, e.hire_date, s.how_many_withdrawals, s.smallest_payout, s.biggest_payout, t.how_many_titles, t.last_promotion
              FROM employees AS e,
              (SELECT count(salary) as how_many_withdrawals, max(salary) as biggest_payout, min(salary) as smallest_payout, employee_id FROM salary GROUP BY employee_id) AS s,
              (SELECT count(title) as how_many_titles, employee_id, MAX(from_date) as last_promotion FROM titles GROUP BY employee_id) AS t
              WHERE e.id = s.employee_id AND e.id = t.employee_id`,
            },

            {
              name: 'MongoDB',
              query: `Not yet implemented`,
            },
          ],
        },
      ],
    },
    {
      id: 'insert',
      title: '2. Insert',
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        dolore laudantium odio facilis alias distinctio, voluptatum minima
        facere. Nostrum, fuga!`,
      subSections: [
        {
          subTitle: 'Easy',
          queries: [
            {
              name: 'Pgsql',
              query:
                "INSERT INTO salary(employee_id, salary, from_date, to_date) VALUES ${values.map((val) => `(${val[0]}, ${val[1]}, ${val[2]}, ${val[3]})`).join(',')}",
            },
            {
              name: 'Mysql, ClickHouse, MongoDB',
              query: `Not yet implemented`,
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          dolore laudantium odio facilis.
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
