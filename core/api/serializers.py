from rest_framework import serializers
from core.models import Item, Order, OrderItem, Variation, ItemVariation


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'price',
            'discount_price',
            'category',
            'label',
            'slug',
            'description',
            'image'
        )

    def get_category(self, obj):
        return obj.get_category_display()

    def get_label(self, obj):
        return obj.get_label_display()


class OrderItemSerializer(serializers.ModelSerializer):
    # item = StringSerializer()
    item_variations = serializers.SerializerMethodField()
    item_obj = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'item_variations',
            'item_obj',
            'quantity',
            'final_price'
            
        )

    def get_item_obj(self, obj):
        return ItemSerializer(obj.item).data

    def get_item_variations(self, obj):
        return ItemVariationDetailSerializer(obj.item_variations.all(), many=True).data

    def get_final_price(self, obj):
        return obj.get_final_price()

class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()


    class Meta:
        model = Order
        fields = (
            'id',
            'order_items',
            'total'
        )

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data
    

    def get_total(self, obj):
        return obj.get_total()





class VariationDetailSerializer(serializers.ModelSerializer):
    item_obj = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = (
            'id',
            'name',
            'item_obj'
        )

    def get_item_obj(self, obj):
        return ItemSerializer(obj.item).data
class ItemVariationDetailSerializer(serializers.ModelSerializer):
    variation = serializers.SerializerMethodField()

    class Meta:
        model = ItemVariation
        fields = (
            'id',
            'value',
            'attachment',
            'variation'
        )

    def get_variation(self, obj):
        return VariationDetailSerializer(obj.variation).data


class ItemVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = (
            'id',
            'value',
             'attachment'
        )

class VariationSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = (
            'id',
            'name',
            'item_variations'
        )

        def get_item_variations(self, obj):
            return ItemVariationSerializer(obj.itemvariation_set.all(), many=True).data