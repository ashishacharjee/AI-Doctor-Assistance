
import mysql.connector
conn=mysql.connector.connect(
    host="localhost",
    user="root",
    password="ashish12345",
    database="onlinefoodorderingsystem")
cursor=conn.cursor()
print("Connected to the database successfully!")

def add_menu_item():
    name=input("Enter item name: ")
    price=float(input("Enter item price:"))
    category=input("Enter item category:")
    
    query="INSERT INTO Menu (ItemName, Price, Category) VALUES (%s, %s, %s)"
    cursor.execute(query, (name, price, category))
    conn.commit()
    print("Item added successfully!")

def remove_menu_item():
    item_id=int(input("Enter the Item ID to remove: "))
    cursor.execute("SELECT * FROM Menu WHERE ItemID = %s", (item_id,))
    if cursor.fetchone():
        query="DELETE FROM Menu WHERE ItemID = %s"
        cursor.execute(query, (item_id,))
        conn.commit()
        print(f"Item with ID {item_id} removed successfully!")
    else:
        print("Item not found.")

def update_menu_item():
    item_id=int(input("Enter the Item ID to update: "))
    cursor.execute("SELECT * FROM Menu WHERE ItemID = %s", (item_id,))
    if cursor.fetchone():
        new_name=input("Enter new name (leave blank to keep current): ")
        new_price=input("Enter new price (leave blank to keep current): ")
        new_category = input("Enter new category (leave blank to keep current): ")
        updates=[]
        if new_name:
            updates.append("ItemName=%s")
        if new_price:
            updates.append("Price=%s")
        if new_category:
            updates.append("Category=%s")
        if updates:
            query=f"UPDATE Menu SET {', '.join(updates)} WHERE ItemID=%s"
            params=[param for param in [new_name, new_price, new_category] if param]
            params.append(item_id)
            cursor.execute(query, tuple(params))
            conn.commit()
            print("Item updated successfully!")
        else:
            print("No changes made.")
    else:
        print("Item not found.")

def search_menu():
    keyword=input("Enter item name or category to search: ")
    query="SELECT * FROM Menu WHERE ItemName LIKE %s OR Category LIKE %s"
    cursor.execute(query, (f"%{keyword}%", f"%{keyword}%"))
    results=cursor.fetchall()
    if results:
        print("Search Results:")
        for row in results:
            print(row)
    else:
        print("No items found.")

def place_order():
    customer=input("Enter customer name: ")
    item_id=int(input("Enter item ID: "))
    quantity=int(input("Enter quantity: "))   
    # Check item availability
    cursor.execute("SELECT ItemName, Price FROM Menu WHERE ItemID=%s", (item_id,))
    item=cursor.fetchone()
    if item:
        item_name, price=item
        total_cost=price * quantity 
        # Insert order
        query="INSERT INTO Orders (CustomerName, ItemID, Quantity, TotalCost) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (customer, item_id, quantity, total_cost))
        conn.commit()
        print(f"Order placed! Total cost: {total_cost}")
    else:
        print("Item not available.")

def generate_bill():
    customer=input("Enter customer name: ")
    # Fetch order details for the customer
    query="""
        SELECT Orders.OrderID, Menu.ItemName, Orders.Quantity, Orders.TotalCost 
        FROM Orders 
        JOIN Menu ON Orders.ItemID = Menu.ItemID 
        WHERE Orders.CustomerName = %s
    """
    cursor.execute(query, (customer,))
    results=cursor.fetchall()
    if results:
        print("Bill Details:")
        total=0
        for row in results:
            print(f"Order ID: {row[0]}, Item: {row[1]}, Quantity: {row[2]}, Cost: {row[3]}")
            total+=row[3]
        # Display total bill
        print(f"Total Bill: {total}")
        # Save the bill summary to the database
        save_query="INSERT INTO BillSummary (CustomerName, TotalAmount) VALUES (%s, %s)"
        cursor.execute(save_query, (customer, total))
        conn.commit()
        print("Bill saved successfully in BillSummary table!")
    else:
        print("No orders found for this customer.")

def show_menu():
    cursor.execute("SELECT * FROM Menu")
    results=cursor.fetchall()
    for row in results:
        row=list(row)
        row[3]=float(row[3])
        print(row)

def main():
    while True:
        print("\n--- Online Food Ordering System ---")
        print("1. Add Menu Item")
        print("2. Update Menu Item")
        print("3. Search Menu")
        print("4. Place Order")
        print("5. Generate Bill")
        print("6. Exit")
        print("7. Show menu")
        choice=input("Enter your choice (1-7): ")
        if choice=="1":
            add_menu_item()
        elif choice=="2":
            update_menu_item()
        elif choice=="3":
            search_menu()
        elif choice=="4":
            place_order()
        elif choice=="5":
            generate_bill()
        elif choice=="6":
            print("Thank you for using the system!")
            break
        elif choice == "7":
            show_menu()
        else:
            print("Invalid choice. Please try again.")

main()
