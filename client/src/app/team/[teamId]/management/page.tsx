import React from 'react';
import TeamManagement from './components/TeamManagement';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import StyledContainer from "@/components/StyledContainer";

const teammanagementpage = () => {
  return (
    <StyledContainer>
      <div>
        <TeamManagement />
      </div>
    </StyledContainer>
  );
}

export default teammanagementpage;
