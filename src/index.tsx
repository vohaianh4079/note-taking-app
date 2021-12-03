import './index.css';

import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import NoteEditor from './NoteEditor';
import NoteListing from './NoteListing';
import NoteSearch from './NoteSearch';
import Register from './Register';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Container className="vstack min-vh-100 gap-3" fluid>
				<Header />
				<Routes>
					<Route path="/" element={<NoteListing />} />
					<Route path="/edit" element={<NoteEditor />} />
					<Route path="/edit/:noteId" element={<NoteEditor />} />
					<Route path="/search" element={<NoteSearch />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Container>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
