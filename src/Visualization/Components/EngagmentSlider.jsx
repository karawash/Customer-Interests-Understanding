import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from '../Components/SliderHandler' 

const sliderStyle = {
  position: 'relative',
  width: '100%',
}


// default selected range
const defaultValues = [0, 10000]

class EngagmentSlider extends Component {
  state = {
    domain: [0, 10000],
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    reversed: false,
  }
  
  Engagmentfilter = () => {
      let min = this.state.values[0], max = this.state.values[1]
      let tastegraphA = JSON.parse(localStorage.getItem("tastegraphA"))
      tastegraphA = tastegraphA.filter(function(element){
        if(element.engagement > min && element.engagement < max)
          element.activeEngagement = true
        else
          element.activeEngagement = false
        return tastegraphA;
      })

      let tastegraphB = JSON.parse(localStorage.getItem("tastegraphB"))      
      tastegraphB = tastegraphB.filter(function(element){
        if(element.engagement > min && element.engagement < max)
          element.activeEngagement = true
        else
          element.activeEngagement = false
        return tastegraphB;
      })
      
      localStorage.setItem("tastegraphA", JSON.stringify(tastegraphA));
      localStorage.setItem("tastegraphB", JSON.stringify(tastegraphB));
      this.props.updateGraph()

   }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
    this.Engagmentfilter()
  }

  setDomain = domain => {
    this.setState({ domain })
  }

  toggleReverse = () => {
    this.setState(prev => ({ reversed: !prev.reversed }))
  }

  render() {
    const {
      state: { domain, values, update, reversed },
    } = this

    return (
      <div style={{ height: 50, width: '90%', margin: '5%'}}>
                
        <Slider
          mode={2}
          step={1}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={2}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default EngagmentSlider;