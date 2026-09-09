# GeMLY React Front End

GeMLY is a secure government procurement compliance workspace built with React and Vite.

## Run with the backend

Start the backend first:

```bash
cd ../gemly-backend
npm install
npm start
```

Then in this project:

```bash
npm install
npm run dev
npm run build
```

The frontend is configured to proxy API requests to the backend at `http://localhost:3000`.

## Notes

- The app includes English/Hindi switching and high-contrast accessibility mode.
- The dashboard, bid review, and integrity screens consume the Express + SQLite API endpoints.
- The design is responsive and built for procurement officer workflows.
