from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.SchoolDetailView.as_view(), name='school-profile'),
    path('holidays/', views.SchoolHolidayListCreateView.as_view(), name='school-holidays'),
]
