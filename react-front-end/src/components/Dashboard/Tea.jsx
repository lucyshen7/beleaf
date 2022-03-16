import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../../styles/Tea.css';

export function Tea() {
  return (
    <div id="container">
      <div className="steam" id="steam1"></div>
      <div className="steam" id="steam2"></div>
      <div className="steam" id="steam3"></div>
      <div className="steam" id="steam4"></div>

      <div id="cup">
        <div id="cup-body">
          <div id="cup-shade"></div>
          <Icon name="leaf"/> 
        </div>
        <div id="cup-handle"></div>
      </div>

      <div id="saucer"></div>

      <div id="shadow"></div>
    </div>
  );
}
