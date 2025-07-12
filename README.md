# ⚡ Efficient File Upload with Axios, Drizzle, PostgreSQL & Zod

This project demonstrates a **minimal, efficient, and modern** file upload flow using:

- **Axios** for frontend uploads with progress tracking
- **Zod** for safe schema validation
- **PostgreSQL** + **Drizzle ORM** for metadata persistence
- **Next.js API routes** or **Node.js backend** for processing

---

## 📦 Tech Stack

- **Frontend**: Next.js (App Router) + Axios
- **Validation**: Zod
- **Backend**: Node.js/Next.js API route
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Cloud Storage**: Cloudinary (can be replaced with any service)

---

## 🔁 Upload Flow Overview

1. **User selects a file** from a form.
2. **Zod validates** the file client-side.
3. File is uploaded directly from the **frontend using Axios**, with real-time progress tracking.
4. Upload response (file URL, public ID, etc.) is sent to the backend via a POST request.
5. **Zod validates the metadata** on the backend.
6. Metadata is **stored in PostgreSQL** using Drizzle ORM.

---

## 📁 Project Structure

```
src/
├── app/
│ └── upload/ # Frontend upload page
├── lib/
│ └── drizzle/ # Drizzle ORM setup and schema
│ └── utils/ # Cloudinary helpers (signature, upload)
├── actions/
│ └── upload.ts # Function to upload metadata to DB
├── api/
│ └── cloudinary/ # Signature or direct upload endpoint
└── components/
└── UploadForm.tsx # File input, validation, and Axios upload
```

---

## 🚀 How to Use

### 1. Clone & Install

```bash
git clone https://github.com/yourname/efficient-upload-demo.git
cd efficient-upload-demo
npm install
```

### 2.Setup`.env`

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_CLOUD_NAME=your_cloud_name

```

### 3. Run app

```
npm run dev

```

**_ ✅ Benefits _**
🔒 Type-safe from frontend to database

⚡ Fast uploads with real-time progress

🧼 Clean separation of logic and UI

🔍 Zod catches invalid data early

💾 Drizzle gives full control over SQL schema

**_ 🛠️ Future Enhancements _**
✅ Multiple file uploads

✅ Role-based upload restrictions

✅ File size limits server-side

✅ Image optimization and thumbnails

Let me know if you want it to include a **live demo**, **deployment notes**, or **how to seed the database**.
