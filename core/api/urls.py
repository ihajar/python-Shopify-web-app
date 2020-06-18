from django.urls import path
from .views import (
    ItemListView, 
    AddToCartView, 
    OrderDetailView,
    OrderItemDeleteView,
    OrderQuantityUpdateView
) 
urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='product-list'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('order-items/<pk>/delete/',
         OrderItemDeleteView.as_view(), name='order-item-delete'),
    path('order-item/update-quantity/',
         OrderQuantityUpdateView.as_view(), name='order-item-update-quantity'),
]
