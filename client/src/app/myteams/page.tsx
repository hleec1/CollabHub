'use client';
import styles from './teams.module.css';
import { useRouter } from 'next/navigation';
import StyledContainer from "@/components/StyledContainer";

const Teams = () => {

  const router = useRouter();
  
  const goBack = () => {
    // Implement go back functionality
  };
  const addTeam = () => {
    // Go to add team page
  };

  const teams = ['Team 8 Software Engineering']

  const goToTeam = (team: any) => {
    // Go to team page
    router.push(`/team/${team}`);
  };

  return (
    <StyledContainer>
    <div className={styles.container}>
      <div className={styles.teamsHeader}>
        <button onClick={addTeam} className={styles.button}>+</button>
      </div>
      <div className={styles.subtitle}>Your Teams</div>
      <div className={styles.teamList}>
        {teams.map((team, index) => (
          <div key={index} className={styles.teamCard}>
            <button className={styles.teamButton} onClick={goToTeam}>{team}</button>
          </div>
        ))}
      </div>
      </div>
      </StyledContainer>
  );
};

export default Teams;
