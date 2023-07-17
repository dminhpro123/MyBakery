import React from 'react';
import GoogleMapReact from 'google-map-react';
import * as S from './style';

const Map = () => {
  const AnyReactComponent = () => <div></div>;

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    // console.log('API đã được tải thành công');
    // console.log('Đối tượng map:', map);
    // console.log('Đối tượng maps:', maps);
  };

  return (
    <>
      <S.MapBorder>
        <S.MapRender>
          <GoogleMapReact
            // bootstrapURLKeys={{ key: "" }}
            defaultCenter={{
              lat: 16.080893,
              lng: 108.213692,
            }}
            defaultZoom={18}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <AnyReactComponent
              lat={16.080893}
              lng={108.213692}
              text="Cake Store map"
            />
          </GoogleMapReact>
        </S.MapRender>
      </S.MapBorder>
    </>
  );
};

export default Map;
