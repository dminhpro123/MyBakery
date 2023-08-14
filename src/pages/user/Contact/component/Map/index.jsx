import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';

const Map = () => {
  const AnyReactComponent = () => <S.StoreName> My bakery</S.StoreName>;
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const renderMarkers = (map, maps) => {
    new maps.Marker({
      position: {
        lat: 16.080858,
        lng: 108.2132054,
      },
      map,
      title: 'My Bakery',
    });
  };

  const handleApiLoaded = (map, maps) => {
    renderMarkers(map, maps);
  };

  return (
    <>
      <S.MapBorder>
        <S.MapRender>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: apiKey,
            }}
            defaultCenter={{
              lat: 16.080858,
              lng: 108.2132054,
            }}
            defaultZoom={18}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <AnyReactComponent
              lat={16.080858}
              lng={108.2132054}
              text="Cake Store map"
            />
          </GoogleMapReact>
        </S.MapRender>
      </S.MapBorder>
    </>
  );
};

export default Map;
