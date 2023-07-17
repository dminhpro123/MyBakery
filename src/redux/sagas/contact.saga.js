import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  //   getContactListRequest,
  //   getContactListSuccess,
  //   getContactListFailure,
  postContactRequest,
  postContactSuccess,
  postContactFailure,
} from 'redux/slicers/contact.slice';

function* postContactSaga(action) {
  try {
    const { fullName, email, phone, title, content } = action.payload;
    const result = yield axios.post('http://localhost:4000/contacts', {
      fullName,
      email,
      phone,
      title,
      content,
    });
    yield put(postContactSuccess({ data: result.data }));
  } catch (e) {
    yield put(postContactFailure({ error: e }));
  }
}

export default function* contactSaga() {
  yield takeEvery(postContactRequest.type, postContactSaga);
}
