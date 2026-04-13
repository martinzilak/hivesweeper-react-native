import { FC } from 'react';
import { StyledA, StyledLi, StyledP, StyledStrong, StyledUl } from '../../components/Styled';

const Home: FC = () => (
  <>
    <StyledStrong>Welcome!</StyledStrong>

    <StyledP>
      Hivesweeper is a bee-themed spin on a classic mine-sweeping puzzle, played on a hexagonal honeycomb grid. 🐝
    </StyledP>

    <StyledP>Can you clear the hive without disturbing its stripy inhabitants? 💛</StyledP>

    <br />

    <StyledStrong>What to expect</StyledStrong>

    <StyledUl>
      <StyledLi>3️⃣ Three levels of difficulty</StyledLi>
      <StyledLi>📊 Game statistics</StyledLi>
      <StyledLi>🌳 Wholesome graphics</StyledLi>
      <StyledLi>🎶 Calming background music</StyledLi>
      <StyledLi>🆓 100% free, no ads, no tracking</StyledLi>
    </StyledUl>

    <br />

    <StyledStrong>Play now</StyledStrong>

    <StyledUl>
      <StyledLi>
        🌐 <StyledA href="/play">Play in your browser</StyledA> - no download needed.
      </StyledLi>
      <StyledLi>
        📲 <StyledA href="/play">Install as an app</StyledA> - on Android or desktop, open the game and tap <em>Install app</em> in the menu. On iOS, use Safari's Share and <em>Add to Home Screen</em>.
      </StyledLi>
    </StyledUl>
  </>
);

export default Home;
