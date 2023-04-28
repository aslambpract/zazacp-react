import { createContext, useContext } from "react";
import ProfileBanner from "./components/ProfileBanner";
import TabElements from "./components/TabElement";
import Wrapper from "./components/Wrapper";
import useMemberProfile from "./hooks/useMemberProfile";
import useTab from "./hooks/useTabs";
const context = createContext(null);

const { Provider } = context;

export const useMemberProfileContext = () => useContext(context);

const MemberProfile = () => {
  const { fetchMemberProfile, memberProfile, dispatch } = useMemberProfile();
  const { currentTab, onChangeTab } = useTab();
  return (
    <Wrapper>
      <Provider value={{ memberProfile, fetchMemberProfile, dispatch }}>
        <ProfileBanner value={currentTab} onChange={onChangeTab} />
        <TabElements currentTab={currentTab} memberProfile={memberProfile} />
      </Provider>
    </Wrapper>
  );
};

export default MemberProfile;
