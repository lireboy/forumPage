import React, {Component} from 'react';
import './PublicPage.css';
import './Styleguide.css';
import motorrad from './pictures/motorrad-1.png'
import deinMotorradForum from './pictures/dein-motorrad-forum.svg'
import nuerburgring from './pictures/kisspng-nrburgring-wall-decal-sticker-gran-turismo-sport-5b18b70.png'
import zumForum from './pictures/motorradfahren-gruppe-2101-njslpq.png'



class PublicPage extends Component {

  render() {
    return (
      <div className="container-center-horizontal">
        <div className="start-desktopscreen">
          <div className="overlap-group">
            <div className="top">
              <img className="motorrad" src={motorrad} alt=""/>
              <img className="dein-motorrad-forum" src={deinMotorradForum} alt=""/>
              <img className="nuerburgring" src={nuerburgring} alt=""/>   
            </div>
          </div>
          <div className="bottom">
          </div>
        </div>
      </div>
    )
  }
}

export default PublicPage
