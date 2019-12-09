import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import './style.css';
import { myTheme } from "../../utils/myTheme";


export default function HelpBox() {

  return (
    <Box id="helpContainer" style={{ backgroundColor: myTheme.palette.primary.secondary }}>

      <div id="helpContent">

        <h1 style={{ color: myTheme.palette.primary.main }}>How to use Teibi</h1>
        <ol id="helplist">
          <Typography><li>Share link with your buddy you wanna meet!</li></Typography>
          <Typography><li>Drag the map to choose the location and click the marker to lock it.</li></Typography>
          <Typography><li>Wait for the other user to select his/her location.</li></Typography>
          <Typography><li>Teibi will populate a list of happy "meet me half way" locations <span role="img" aria-label="office building emoji">🏢</span> to choose <span role="img" aria-label="locomotive emoji">🚂</span> from <span role="img" aria-label="salance scale emoji">⚖</span> <span role="img" aria-label="shuffle tracks button emoji">🔀</span>.</li></Typography>
          <Typography><li>Voila! See you there!</li></Typography>
        </ol>
        <Typography id="disclosure">PS: Locate yourself, chat with your buddy. We never store any of this information! We Promise!</Typography>

        <h1 style={{ color: myTheme.palette.primary.main }}>Team Teibi</h1>
        <div id="team">
          <a href="mailto:info@teibi.ca" title="Teibi"><Avatar >T</Avatar></a>
          <a href="mailto:neha@teibi.ca" title="Neha"><Avatar>NG</Avatar></a>
          <a href="mailto:yuka@teibi.ca" title="Yuka"><Avatar>YN</Avatar></a>
          <a href="mailto:stanley@teibi.ca" title="Stanley"><Avatar>SZ</Avatar></a>
          <a href="mailto:hector@teibi.ca" title="Héctor"><Avatar>HM</Avatar></a>
        </div>

      </div>
    </Box >
  );
}