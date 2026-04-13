import { FC } from 'react';
import { StyledA, StyledLi, StyledP, StyledStrong, StyledUl } from '../../components/Styled';

const Home: FC = () => (
  <>
    <StyledStrong>Welcome!</StyledStrong>

    <StyledP>This is Hivesweeper, a pun-tastic spin on a classic mine sweeping puzzle. 🐝</StyledP>

    <StyledP>
      Classic game structure enjoyed by generations, with a fun twist. Can you get around this hexagonal world without
      disturbing its stripy inhabitants? 💛
    </StyledP>

    <StyledP>Clear your head, solve some puzzles, and watch out for the bees!</StyledP>

    <br />

    <StyledStrong>What can you expect?</StyledStrong>

    <StyledUl>
      <StyledLi>3️⃣ Three levels of difficulty</StyledLi>
      <StyledLi>📊 Game statistics</StyledLi>
      <StyledLi>🌳 Wholesome graphics</StyledLi>
      <StyledLi>🎶 Calming background music</StyledLi>
      <StyledLi>🆓 100% free</StyledLi>
      <StyledLi>❌ No ads or tracking</StyledLi>
      <StyledLi>🌱 Vegan and cruelty-free</StyledLi>
    </StyledUl>

    <br />

    <StyledStrong>What are you waiting for?</StyledStrong>

    <StyledP>
      <StyledA href="https://apps.apple.com/us/app/hivesweeper/id1581731994">Download</StyledA> Hivesweeper from the App
      Store.
    </StyledP>
  </>
);

export default Home;
