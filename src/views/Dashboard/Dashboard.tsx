import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background.jpg';
import Page from '../../components/Page';
import Container from '../../components/Container';
import Bond from './components/Bond';
import { BombFarms } from './components/BombFarms';
import { Boardroom } from './components/Boardroom';
import BombFinanceSummary from './components/BombFinanceSummary';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
    font-family:Nunito ;
  }
`;

const TITLE = 'bomb.money | Dashboard';

const boxStyles = {
  backgroundColor: 'rgba(35, 40, 75, 0.75)', 
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5.5px)',
  padding: '15px',
  border: '1px solid #728CDF',
  margin: ' 10px 0',
  color: 'white',
};

const Dashboard: React.FC = () => {
  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <Container size="lg">
        {/* first box i.e, bomb finance summary*/}
        <BombFinanceSummary  {...boxStyles}/>

        {/* second box i.e, boardroom*/}
        <Boardroom {...boxStyles} />

        {/* third box i.e, bomb farms */}
        <BombFarms {...boxStyles}/>

        {/* forth box i.e, bonds */}
        <Bond {...boxStyles} />
      </Container>
    </Page>
  );
};

export default Dashboard;
