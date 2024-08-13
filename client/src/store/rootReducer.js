import { combineReducers } from "redux";
import attendanceReducer from "../features/attendance/attendanceSlice";
import studentReducer from "../features/student/studentSlice";
import teacherReducer from "../features/teacher/teacherSlice";
import adminReducer from "../features/admin/adminSlice";

// Combine all reducers into a single root reducer. This will be used by the Redux store.
const rootReducer = combineReducers({
  attendance: attendanceReducer,
  student: studentReducer,
  teacher: teacherReducer,
  admin: adminReducer,
});

export default rootReducer;
