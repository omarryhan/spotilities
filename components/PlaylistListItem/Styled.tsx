import styled from 'styled-components';

export const OuterContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  justify-content: space-between;
  margin: 10px 0;
`;

export const LeftSection = styled.div`
  height: 100%;
  max-width: 100%;
  display: flex;
`;

export const RightSection = styled.div`
  height: 100%;
`;

export const ImageSection = styled.div`
  height: 100%;
`;

export const InfoSection = styled.div`
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const ActionSection = styled.div`
  height: 100%;
`;

export const Img = styled.img`
  height: 100%;
`;

export const Name = styled.p`
  margin: 0 0;
  padding-left: 5px;
  font-size: 1rem;
  font-family: "Proxima Bold", Georgia, sans-serif;
  color: ${(props): string => props.theme.colors.white.light};
`;

export const NumberOfTracks = styled.p`
  margin: 0 0;
  padding-left: 5px;
  font-size: 0.7rem;
  color: ${(props): string => props.theme.colors.white.darkest};
`;

export const DetailsSection = styled.div`
  width: 100%;
`;

export const DetailItem = styled.div`
  width: 100%;

`;

export const DetailItemIcon = styled.div`
  width: 100%;

`;

export const DetailItemTitle = styled.p`
  margin: 0 0;
`;
