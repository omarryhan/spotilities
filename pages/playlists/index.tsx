import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import AppBody from '../../components/AppBody';
import PlaylistItemsList from '../../components/PlaylistItemsList';
import TopNav from '../../components/TopNav';
import Snackbar from '../../components/Snackbar';
import { Props as TopNavProps } from '../../components/TopNav/Component';
import BottomNav from '../../components/BottomNav';
import PlaylistItemsCoverSection from '../../components/PlaylistItemsCoverSection';
import PlayShufflePlaylistButton from '../../components/PlayShufflePlaylistButton';
import EditIcon from '../../public/icons/edit.svg';

import { CombinedStateType } from '../../redux/types';
import { fetchUserPlaylistItems } from '../../redux/playlistItems/actions';

// This page should only be accessed dynamically on the browser
// Calling /playlists/your_playlist_id from the browser will return a 404
// I don't think there's a way around that
// When this app routes to this page, it should shallow(ly) update the URL to include
// the playlist_id.
const Page: NextPage = () => {
  let playlistId = '';
  if (typeof window !== 'undefined' && window.location.href.split('/').length === 5) {
    // eslint-disable-next-line prefer-destructuring
    playlistId = window.location.href.split('/')[4];
  }

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  const canEditPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.data[playlistId]?.owner.id === state.profile.data.id,
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (!playlistId || isFetchingPlaylistsItems) {
        return;
      }

      await dispatch(fetchUserPlaylistItems({ playlistId, dispatchSetAudioFeatures: true }));
    };

    effect();
    // Disabling this because we actually want to read isFetchingPlaylists
    // and isFetchingPlaylistsTracksAudioFeaturse once.
    // The reason we're reading both properties:
    // We don't want this component to fetch playlist tracks when it's already doing it
    // This especially slow with large playlists
    // The reason we only want to read them once is that if we don't do that,
    // this effect will infinitely loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // isFetchingPlaylistsItems,
    dispatch,
    playlistId,
  ]);

  const EditIconComponent: React.FC = () => (<EditIcon />);
  const topNavEditProps: TopNavProps = canEditPlaylist ? {
    showRightButton: true,
    RightButton: EditIconComponent,
    onRightButtonClick: (): ReturnType<typeof Router.push> => router.push('/playlists/edit-info', `/playlists/edit-info/${playlistId}`),
  } : {};

  return (
    <>
      <Head>
        <meta name="title" content="Spotilities | Playlist" />
        <title>Spotilities | Playlist</title>
      </Head>
      <Snackbar />
      <TopNav
        showBackButton
        backTo="/library"
        title={playlistName}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...topNavEditProps}
      />
      <AppBody>
        <PlaylistItemsCoverSection playlistId={playlistId} />
        <PlayShufflePlaylistButton playlistId={playlistId} />
        <PlaylistItemsList playlistId={playlistId} />
      </AppBody>
      <BottomNav />
    </>
  );
};

export default Page;
