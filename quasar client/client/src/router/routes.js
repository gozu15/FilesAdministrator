
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'inicio', component: () => import('pages/Index.vue'), name:"Home"},
      { path: 'caratulas', component: () => import('pages/caratulas/Index.vue') },
      { path: 'docmodelo', component: () => import('pages/relationshippCovertDoc/Index.vue') },
      { path: 'upload-image', component: () => import('pages/uploadsDocuments/Index.vue'),name:'UploadImage' },
      { path: 'update-image', component: () => import('pages/uploadsDocuments/UpdateCover.vue'),name:'UpdateCoverImage' },
      { path: 'view-more', component: () => import('pages/uploadsDocuments/ViewMore.vue'),name:'ViewMore' },
      { path: 'add-image', component: () => import('pages/uploadsDocuments/Addnewdocument.vue'), name:'AddImage' },
      

      { path: 'acusations_documents', component: () => import('src/pages/memoriales&decretos/AcusationsDocuments/Index.vue'), name:'AcusationsDocuments' },
      { path: 'autos_documents', component: () => import('src/pages/memoriales&decretos/AutosDocuments/Index.vue'), name:'AutosDocuments' },
      { path: 'decrets_documents', component: () => import('src/pages/memoriales&decretos/DecretsDocuments/Index.vue'), name:'DecretsDocuments' },
      { path: 'resolutions_documents', component: () => import('src/pages/memoriales&decretos/ResolutionsDocuments/Index.vue'), name:'ResolutionsDocuments' },
      { path: 'sentence_documents', component: () => import('src/pages/memoriales&decretos/SentenceDocuments/Index.vue'), name:'SentencesDocuments' },

      { path: 'memoriales_decretos', component: () => import('src/pages/memoriales&decretos/Index.vue') },
      { path: 'memorials_documents', component: () => import('src/pages/memoriales&decretos/MemorialsDocuments'), name:'MemorialsDocuments' },
      { path: 'memorials_documents_create', component: () => import('src/components/MemorialsDecrets/CreateMemorial'), name:'CreateMemorialsDocuments' },
      { path: 'memorials_documents_update', component: () => import('src/components/MemorialsDecrets/UpdateMemorial'), name:'UpdateMemorialsDocuments' },

      { path: 'memorials_models', component: () => import('src/pages/memoriales&decretos/MemorialsModels'), name:'MemorialDecretModel' },
      { path: 'memorials_models_create', component: () => import('src/components/MemorialsDecretsModels/Create.vue'), name:'MemorialDecretModelCreate' },
      { path: 'memorials_models_update', component: () => import('src/components/MemorialsDecretsModels/Update.vue'), name:'MemorialDecretModelUpdate' },
      { path: 'memorials_models_linking', component: () => import('src/components/MemorialsDecretsModels/JoinCoverImageTagsAndModels.vue'), name:'MemorialModelsLinking'},

      { path: 'library_laws', component: () => import('pages/library_laws/Index.vue'), name:'LibraryLaws' },
      { path: 'library_laws_create', component: () => import('src/components/LibraryLawsAndRegulations/CreateLibrary.vue'), name:'LibraryLawsAdd' },
      { path: 'library_laws_init', component: () => import('src/components/LibraryLawsAndRegulations/GetAll.vue'), name:'LibraryLawsList' },
      { path: 'library_laws_preview', component: () => import('src/components/LibraryLawsAndRegulations/PreviewPdf.vue'), name:'LibraryLawsPreviewPDF' },
      { path: 'library_laws_update', component: () => import('src/components/LibraryLawsAndRegulations/Updatebook.vue'), name:'LibraryLawsUpdatePDF' },

      { path: 'notify_audience', component: () => import('pages/notifies_court/Index.vue'), name:'NotifyGetAll' },
      { path: 'notify_audience_create', component: () => import('src/components/NotifyAudience/CreateNotify.vue'), name:'NotifyCreate' },
      { path: 'notify_audience_update', component: () => import('src/components/NotifyAudience/UpdateNotify.vue'), name:'NotifyUpdate' },
      { path: 'notify_audience_preview', component: () => import('src/components/NotifyAudience/PreviewNotify.vue'), name:'NotifyPreview' },

      { path: 'books_diary', component: () => import('pages/libros_diarios/Index.vue'), name:'GetDiarybooks' },
      { path: 'books_diary_register', component: () => import('src/components/DiaryBooks/CreateDiaryBook.vue'), name:'CreateDiarybooks' },
      { path: 'books_diary_update', component: () => import('src/components/DiaryBooks/Update.vue'), name:'UpdateDiarybooks' },
      { path: 'books_diary_content', component: () => import('src/components/DiaryBooks/DiaryBookContent.vue'), name:'GetContentDiarybook' },
      { path: 'books_diary_content-create', component: () => import('src/components/DiaryBooks/CreateContent.vue'), name:'CreateContentDiarybook' },
      { path: 'books_diary_content-update', component: () => import('src/components/DiaryBooks/UpdateContentDiary.vue'), name:'UpdateContentDiarybook' },
      { path: 'books_diary_content-preview', component: () => import('src/components/DiaryBooks/PreviewContentDiaryBook.vue'), name:'PreviewContentDiarybook' },
      //UpdateContentDiary

    ],
    redirect: { path: 'inicio' }
  },
  {
    path: '/tags_and_models',
    component: () => import('layouts/JoinTagsAndModels.vue'),
    children: [
      { path: '', component: () => import('pages/memoriales&decretos/MemorialsModels/TagsandModels.vue') }
    ],
    redirect: { path: '' }
  },
   {
    path: '/login',
    component: () => import('layouts/MainLayoutLogin.vue'),
    children: [
      { path: '', component: () => import('pages/login_views/Index.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
