var React = require('react');
var ReactPropTypes = React.PropTypes;


var WebtilesList = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {};
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var rows = [];
    this.props.webtiles.forEach(function(webtile) {
      var thumbStyle = {
        backgroundImage: 'url(' + webtile.imageURI + ')'
      };
      var enhancedThumbStyle = {
        backgroundImage: 'url(' + webtile.enhancedImageURI + ')'
      };
      rows.push(
        <div className="newtab-cell">
          <div className="newtab-site">
            <a className="newtab-link" href={webtile.url} title={webtile.title}>
              <img src={webtile.imageURI} />
              <span className="newtab-thumbnail" style={thumbStyle}></span>
              <span className="newtab-thumbnail enhanced-content" style={enhancedThumbStyle}></span>
              <span className="newtab-title">{webtile.title}</span>
            </a>

          </div>
        </div>
      );
    });

    return (
      <div id="newtab-grid">
        {rows}
      </div>
    );
  }

});

module.exports = WebtilesList;
