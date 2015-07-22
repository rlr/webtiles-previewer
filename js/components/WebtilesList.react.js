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
      rows.push(
        <li>
          <img src={webtile.imageURI} />
          <img src={webtile.enhancedImageURI} />
          <dl>
            <dt>Title</dt>
            <dd>{webtile.title}</dd>
            <dt>Type</dt>
            <dd>{webtile.type}</dd>
            <dt>URL</dt>
            <dd><a href={webtile.url}>{webtile.url}</a></dd>
          </dl>
        </li>
      );
    });

    return (
      <ul>
        {rows}
      </ul>
    );
  }

});

module.exports = WebtilesList;
