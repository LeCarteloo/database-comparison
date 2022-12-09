import { Dashboard, StackedLineChart, Insights } from '@mui/icons-material';
import * as S from './Sidebar.styled';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    {
      icon: <Dashboard />,
      path: '/',
      label: 'Get Started',
    },
    {
      icon: <StackedLineChart />,
      path: '/overview',
      label: 'Overview',
    },
    {
      icon: <Insights />,
      path: '/insights',
      label: 'Insights',
    },
  ];

  return (
    <S.Aside>
      <S.Nav>
        <h2>Database comparison</h2>
        <S.List>
          {items.map((item) => (
            <S.Item key={item.label}>
              <NavLink to={item.path}>
                {item.icon}
                {item.label}
              </NavLink>
            </S.Item>
          ))}
        </S.List>
      </S.Nav>
    </S.Aside>
  );
};

export default Sidebar;
