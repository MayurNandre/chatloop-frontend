import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import {
    Box,
    Container,
    Paper,
    Skeleton,
    Stack,
    Typography
} from '@mui/material';
import moment from "moment";
import AdminLayout from '../../components/layout/AdminLayout';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';
import { CurveButton, SearchFeild } from "../../components/styles/StyledComponent";
import { matBlack } from '../../constants/color';

// RTK Query hook
import { useErrors } from '../../hooks/hook';
import { useAdminStatsQuery } from '../../redux/api/api';

const Dashboard = () => {
    // Fetch admin stats using RTK Query
    const { data, isLoading, isError, error } = useAdminStatsQuery();

    // Destructure stats from API response
    const {
        stats: {
            groupsCount,
            userCounts,
            messagesCount,
            totalChatCounts
        } = {},
        messages = []
    } = data || {};


    const errors = [{ isError, error }];
    useErrors(errors);

    // AppBar Component
    const appBar = (
        <Paper
            elevation={3}
            sx={{
                padding: "0.6rem",
                margin: "0.6rem 0",
                borderRadius: "1rem"
            }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: { sm: "2rem", lg: "3rem" } }} />
                <SearchFeild placeholder='Search...' />
                <CurveButton>Search</CurveButton>
                <Box flexGrow={1} />
                <Typography
                    fontFamily={"monospace"}
                    // display={{ xs: "none", lg: "block" }}
                    color={'rgba(0,0,0,0.7)'}
                    fontSize={{ xs: "0.7rem", lg: "1.2rem" }}
                >
                    {moment().format("dddd - D MMMM YYYY")}
                </Typography>
                <NotificationsIcon sx={{ fontSize: { sm: "0.5rem", lg: "2rem" } }} />
            </Stack>
        </Paper>
    );

    // Widgets Section
    const Widgets = (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={"1.5rem"}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={"1rem 0"}
        >
            <Widget title={"Users"} value={userCounts || 0} icon={<PersonIcon />} />
            <Widget title={"Chats"} value={totalChatCounts || 0} icon={<GroupIcon />} />
            <Widget title={"Messages"} value={messagesCount || 0} icon={<MessageIcon />} />
        </Stack>
    );

    return (
        <AdminLayout>
            {
                isLoading ? <Skeleton height={"100vh"} /> : <Container component={"main"}>
                    {appBar}
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        // flexWrap={"wrap"}
                        // justifyContent={"center"}
                        alignItems={{ xs: "center", lg: "stretch" }}
                        sx={{ gap: "1rem" }}
                    >
                        {/* Line Chart */}
                        <Paper
                            elevation={5}
                            sx={{
                                padding: "2rem 3.5rem",
                                borderRadius: "1rem",
                                width: "100%",
                                maxWidth: "61rem",
                                maxHeight: "36rem"
                            }}
                        >
                            <Typography variant='h5' margin={"2rem 0"}>Last 7 Days Messages</Typography>
                            <LineChart value={messages || []} />
                        </Paper>

                        {/* Doughnut Chart */}
                        <Paper
                            elevation={5}
                            sx={{
                                padding: "1.5rem",
                                borderRadius: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: { xs: "100%", sm: "50%" },
                                maxWidth: "61rem",
                                maxHeight: "26rem"
                            }}
                        >
                            <DoughnutChart
                                labels={["Group Chats", "Single Chats"]}
                                value={[groupsCount || 0, (totalChatCounts - groupsCount) || 0]}
                            />
                            <Stack
                                position={"absolute"}
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={"0.5rem"}
                                height={"100%"}
                                width={"100%"}
                            >
                                <GroupIcon />
                                <Typography>Vs</Typography>
                                <PersonIcon />
                            </Stack>
                        </Paper>
                    </Stack>

                    {/* Widgets */}
                    <Stack
                        sx={{ padding: { lg: "0.3rem" } }}
                    >
                        {Widgets}
                    </Stack>
                </Container>
            }
        </AdminLayout>
    );
};

// Widget Component
const Widget = ({ title, value, icon }) => {
    return (
        <Paper
            elevation={5}
            sx={{
                padding: "2rem",
                margin: "1rem 0",
                borderRadius: "1.2rem",
                width: "14rem"
            }}
        >
            <Stack alignItems={"center"} spacing={"1rem"}>
                <Typography
                    sx={{
                        color: "rgba(0,0,0,0.6)",
                        borderRadius: "50%",
                        border: `5px solid ${matBlack}`,
                        width: "5rem",
                        height: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "monospace",
                        fontWeight: "600",
                        fontSize: "1.5rem"
                    }}
                >
                    {value}
                </Typography>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={"1rem"}
                >
                    {icon}
                    <Typography>{title}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default Dashboard;
