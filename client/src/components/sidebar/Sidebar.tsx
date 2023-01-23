import { Article, Dashboard, Insights, Leaderboard } from '@mui/icons-material';
import * as S from './Sidebar.styled';
import { useEffect, useState } from 'react';
import { useComparisonContext } from '../../context/ComparisonContext';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { comparisonData } = useComparisonContext();

  const items = [
    {
      icon: <Dashboard />,
      path: '/',
      label: 'Get Started',
      disabled: false,
    },
    {
      icon: <Leaderboard />,
      path: '/overview',
      label: 'Overview',
      disabled: comparisonData.length === 0,
    },
    {
      icon: <Insights />,
      path: '/insights',
      label: 'Insights',
      disabled: comparisonData.length === 0,
    },
    {
      icon: <Article />,
      path: '/docs',
      label: 'Docs',
      disabled: false,
    },
  ];

  function onResize(this: Window) {
    if (this.innerWidth > 800) {
      setOpen(false);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <S.Hamburger open={open} onClick={() => setOpen(!open)}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </S.Hamburger>
      <S.Aside
        open={open}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <S.Nav>
          <h2>Database comparison</h2>
          <S.List>
            {items.map((item) => (
              <S.Item key={item.label}>
                <S.Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  tabIndex={isMobile && open ? -1 : 0}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                </S.Link>
              </S.Item>
            ))}
          </S.List>
        </S.Nav>
      </S.Aside>
    </>
  );
};

export default Sidebar;
